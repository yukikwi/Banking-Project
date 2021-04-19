const express = require('express')
const router = express.Router();
const db = require('../mysql.config')
const crypto = require('crypto');
const config = require('../config')
const jwt = require('jsonwebtoken');
const app = express()

//REF: https://stackoverflow.com/a/1349426
function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}
router.post('/signup', async (req, res) => {
    var address = req.body.address +' '+ req.body.subdistrict +' '+ req.body.district +' '+ req.body.province +' '+ req.body.zipcode
    var hash = crypto.createHash('sha512')
    var data = hash.update(config["hash_salt"]+req.body.password, 'utf-8')
    var hash_password = data.digest('hex')
    try{
        console.log(req.body)
        db.query('INSERT INTO `USER` (`User_FName`, `User_LName`, `User_Tel`, `User_DOB`, `User_Email`, `User_Address`, `User_NationalID`, `User_App_Password` ) VALUES (?,?,?,?,?,?,?,?)'
        ,[req.body.fname,req.body.lname,req.body.tel,"?",req.body.email,address,req.body.national_id,hash_password])
        console.log('Regsiter Done')
    }
    catch(e){
        //console.log(e)
        console.log('error')
    }
    
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
    var result = {}
    console.log('/me')
    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        console.log(data)
        try{
            var db_data = await db.query('SELECT User_FName, User_LName, User_Email FROM User RIGHT JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])
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
        catch(err){
            console.log(err)
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
    })
    res.json(result)
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
            if(!err){
                result = {
                    status: 200,
                    data: 'Token removed'
                }
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

module.exports = router