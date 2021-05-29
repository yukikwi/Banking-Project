const express = require('express')
const router = express.Router()
const db = require('../mysql.config')
const crypto = require('crypto')
const config = require('../config')
const jwt = require('jsonwebtoken')
const CapyCache = require('../capycache/index')
const cache = new CapyCache()
const multer = require('multer')
const path = require('path')

//REF: https://stackoverflow.com/a/1349426
function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

//Validate National ID
router.post('/validate', async (req, res) => {
    //Initial
    var result = {}
    //Duplicate check
    var duplicate_national_id = await db.query('SELECT User_ID FROM User WHERE User_NationalID LIKE ? ', [req.body.national_id])
    if(duplicate_national_id.length > 0){
        result = {
            status: false
        }
    }
    else{
        result = {
            status: true
        }
    }
    res.json(result)
})

//Validate Email
router.post('/validateEmail', async (req, res) => {
    //Initial
    var result = {}
    //Duplicate check
    var duplicate_email = await db.query('SELECT User_ID FROM User WHERE User_Email LIKE ? ', [req.body.email])
    if(duplicate_email.length > 0){
        result = {
            status: false
        }
    }
    else{
        result = {
            status: true
        }
    }
    res.json(result)
})

//Register
router.post('/signup', async (req, res) => {
    //Initial
    var result = {}

    //Build address
    var address = req.body.address +' '+ req.body.subdistrict +' '+ req.body.district +' '+ req.body.province +' '+ req.body.zipcode

    //Hash password
    var hash = crypto.createHash('sha512')
    var data = hash.update(config["hash_salt"]+req.body.password, 'utf-8')
    var hash_password = data.digest('hex')

    //Duplicate check
    var duplicate_mail = await db.query('SELECT User_ID FROM User WHERE User_Email = ? ', [req.body.email])
    var duplicate_national_id = await db.query('SELECT User_ID FROM User WHERE User_NationalID = ? ', [req.body.national_id])
    if(duplicate_mail.length > 0 || duplicate_national_id.length > 0){
        result = {
            status: 403,
            data: 'Duplicate data',
            duplicate: {
                mail: (duplicate_mail.length > 0)? true: false,
                national_id: (duplicate_national_id.length > 0)? true: false
            }
        }
    }
    else{
        try{
            date = new Date(req.body.dob)
            const dob = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()
            await db.query('INSERT INTO `User` (`User_FName`, `User_LName`, `User_Tel`, `User_DOB`, `User_Email`, `User_Address`, `User_NationalID`, `User_App_Password` ) VALUES (?,?,?,?,?,?,?,?)'
            ,[req.body.fname, req.body.lname, req.body.tel, dob, req.body.email, address, req.body.national_id, hash_password])
            result = {
                status: 200,
                data: 'Register success'
            }
        }
        catch(err){
            console.log(err)
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
    }
    res.json(result)
})

//login
router.post('/login', async (req, res) => {
    var result = {}
    // Hash Password
    var hash = crypto.createHash('sha512')
    var data = hash.update(config["hash_salt"]+req.body.password, 'utf-8')
    var hash_password = data.digest('hex')
    console.log("Try to login User: "+req.body.username)
    // Get User Data from credential
    try{
        var db_data = await db.query('SELECT User_ID, User_FName, User_LName FROM User WHERE User_Email = ? AND User_App_Password = ?', [req.body.username, hash_password])
        if(db_data.length > 0){
            //Create Token
            do{
                var token = makeid(128)
                var is_token_exist = await db.query('SELECT accessToken FROM JWT WHERE accessToken = ? ', [token])
            }
            while(is_token_exist.length != 0)
            db.query('INSERT INTO `JWT` (`accessToken`, `User_ID`) VALUES (?, ?)', [token, db_data[0].User_ID])
            var data = {
                firstname: db_data[0].User_FName,
                lastname: db_data[0].User_LName,
                token: token
            }
            //Create JWT TOKEN
            const jwtData = jwt.sign(data, config["jwtSecret"]);
            result = {
                status: 200,
                data: {
                    token: jwtData
                }
            }
        }
        else{
            result = {
                status: 404,
                comment: "wrong email / password"
            }
        }
    }
    catch(err){
        console.log(err)
        result = {
            status: 500,
            comment: "mysql error"
        }
    }
    res.json(result)
})

// Get user info from token
router.get('/me', async (req, res) => {
    console.log('/me')
    // Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // If not login
    if (token == null) return res.sendStatus(401)

    let result = {
        status: 500,
        comment: "internal error"
    }

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)

        // Cache
        const getcache = await cache.get('me.'+data.token+'.'+data.firstname+'.'+data.lastname)
        if(getcache != false){
            res.json(getcache)
        } else {
            try{
                var db_data = await db.query('SELECT User_FName, User_LName, User_Email, User_Tel, User_Email, User_Active_Status FROM User \
                INNER JOIN JWT ON User.User_ID = JWT.User_ID \
                WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])
                if(db_data.length > 0){
                    result = {
                        status: 200,
                        data: db_data[0]
                    }
                }
                else{
                    result = {
                        status: 404,
                        comment: "not found"
                    }
                }
                cache.set('me.'+data.token+'.'+data.firstname+'.'+data.lastname, 5, JSON.stringify(result))
            }
            catch(err){
                result = {
                    status: 500,
                    comment: "mysql error"
                }
            }
            res.json(result)
        }
    })
})

//logout
router.post('/logout', async (req, res) => {
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        console.log(data)
        try{
            await db.query('DELETE FROM JWT WHERE accessToken = ? ', [data.token])
            result = {
                status: 200,
                data: 'Token removed'
            }
        }
        catch(err){
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
    })
    res.json(result)
})

// List cc and bank
router.get('/list', async (req, res) => {
    //Get user
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        console.log(data)
        const date = new Date()
        try{
            // Get creditcard data
            var cc_data = await db.query('SELECT UserCreditCard.*, UserCreditCard.Card_MaxAmount - COALESCE(SUM(CreditCardHistory.CardHistory_Amount + CreditCardHistory.CardHistory_Fee),0) balance, UserCreditCard.Card_ID address FROM User \
            INNER JOIN UserCreditCard ON User.User_ID = UserCreditCard.User_ID \
            LEFT JOIN CreditCardHistory ON UserCreditCard.Card_ID = CreditCardHistory.Card_ID AND CreditCardHistory.CardHistory_Datetime LIKE ?\
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? \
            GROUP BY UserCreditCard.Card_ID',
            [ date.getFullYear()+"-"+(('0' + (date.getMonth()+1)).slice(-2))+"%", data.token, data.firstname, data.lastname ])
            cc_data = cc_data.map(v => ({...v, type: 'credit'}))

            // Get account data
            var acc_data = await db.query(' \
            SELECT \
            UserAccount.*, \
            (\
                SUM( case when (TransactionsHistory.User_Target_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) \
                - \
                SUM( case when (TransactionsHistory.User_Sender_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) \
            ) balance, \
            UserAccount.Account_ID address FROM User \
            INNER JOIN UserAccount ON User.User_ID = UserAccount.User_ID \
            LEFT JOIN TransactionsHistory ON UserAccount.Account_ID = TransactionsHistory.User_Target_Internal_AccountID OR UserAccount.Account_ID = TransactionsHistory.User_Sender_Internal_AccountID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? GROUP BY UserAccount.Account_ID',
            [data.token, data.firstname, data.lastname])
            acc_data = acc_data.map(v => ({...v, type: 'debit'}))
            // Merge
            var db_data = [...cc_data, ...acc_data]
            if(db_data.length > 0){
                result = {
                    status: 200,
                    data: db_data
                }
            }
            else{
                result = {
                    status: 404,
                    comment: "not found"
                }
            }
        } catch(err) {
            console.log(err)
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
    })
    res.json(result)
})

router.post('/update', async (req, res) => {
    // Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // If not login
    if (token == null) return res.sendStatus(401)

    let result = {
        status: 500,
        comment: "internal error"
    }

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        try{
            var db_data = ''
            var is_exist = await db.query('SELECT User.User_ID FROM User \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID \
            WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])
            if(is_exist.length === 1){
                if(req.body.User_Tel){
                    db_data = await db.query('UPDATE User SET \
                    User_Tel = ?\
                    WHERE User_ID = ?', [req.body.User_Tel, is_exist[0].User_ID])
                }
                if(req.body.User_Email){
                    db_data = await db.query('UPDATE User SET \
                    User_Email = ?\
                    WHERE User_ID = ?', [req.body.User_Email, is_exist[0].User_ID])
                }

                //Clear Old cache
                await cache.del('me.'+data.token+'.'+data.firstname+'.'+data.lastname)
                //Refresh data
                db_data = await db.query('SELECT User_FName, User_LName, User_Email, User_Tel, User_Email, User_Active_Status FROM User \
                INNER JOIN JWT ON User.User_ID = JWT.User_ID \
                WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])


                if(db_data.length > 0){
                    result = {
                        status: 200,
                        data: db_data[0]
                    }
                }
                else{
                    result = {
                        status: 404,
                        comment: "not found"
                    }
                }
            }
            else{
                result = {
                    status: 404,
                    comment: "not found"
                }
            }
            cache.set('me.'+data.token+'.'+data.firstname+'.'+data.lastname, 5, JSON.stringify(result))
        } catch(err) {
            console.log(err)
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
        res.json(result)
    })
})

const imageStorage = multer.diskStorage({
    // Destination to store image
    destination: __dirname+'/../upload/identity/',
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now()
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
})

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 20000000 // 20000000 Bytes = 20 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) {
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})

router.post('/upload/validate', imageUpload.single('identiyFile'), async (req,res) => {

    //Get user
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        let userid = await db.query('SELECT User.User_ID FROM User \
        INNER JOIN JWT ON User.User_ID = JWT.User_ID \
        WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])
        if(userid.length === 1){
            try{
                let status = await db.query('UPDATE User SET User_Active_Status = \'02\', User_Validate_File = ? WHERE User_ID = ?'
                ,[req.file.filename, userid[0].User_ID])

                cache.del('me.'+data.token+'.'+data.firstname+'.'+data.lastname)
                result = {
                    status: 200,
                    data: status
                }
            }
            catch(e){
                console.log(e)
                result = {
                    status: 500
                }
            }
        }
        else {
            result = {
                status: 404
            }
        }
        res.json(result)
    })
})

//Extends other under /user
const creditcard = require('./creditcard.js')
const debitcard = require('./debitcard.js')
router.use('/creditcard/', creditcard)
router.use('/debitcard/', debitcard)

module.exports = router
