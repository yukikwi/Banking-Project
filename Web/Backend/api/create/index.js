const express = require('express')
const router = express.Router()
const db = require('../mysql.config')
const config = require('../config')
const jwt = require('jsonwebtoken')

//CC validate
router.get('/debittype', async (req, res) => {
    result = await db.query('SELECT Account_Type_ID, Account_Type_Name FROM AccountType')
    res.json(result)
})

router.post('/new', async (req, res) => {
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
        let userid = await db.query('SELECT User.User_ID FROM User \
        INNER JOIN JWT ON User.User_ID = JWT.User_ID \
        WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?', [data.token, data.firstname, data.lastname])
        console.log(userid)
        if(userid.length === 1){
            let insert_result = null
            try{
                if(req.body.type === 'debit'){
                    //Generate
                    let accid
                    do {
                        accid = ''
                        for(let i = 0; i < 13; i++){
                            if (i===3 || i===5 || i===11){
                                accid = accid + '-'
                            }
                            else {
                                accid = accid + Math.floor(Math.random() * 9)
                            }
                        }
                    }
                    while( (await db.query('SELECT Account_ID FROM UserAccount WHERE Account_ID = ?', [accid])).length != 0 )
                    console.log(parseInt(req.body.subtype))
                    insert_result = await db.query('\
                    INSERT INTO UserAccount (Account_ID, User_ID, Account_Type, Account_Status)\
                    VALUES \
                    (?, ?, ?, ?)',
                    [accid, userid[0].User_ID, parseInt(req.body.subtype), '01'])
                }
                if(req.body.type === 'credit'){
                    //Generate
                    let accid
                    do {
                        accid = ''
                        for(let i = 1; i <= 19; i++){
                            if (i%5 === 0){
                                accid = accid + '-'
                            }
                            else {
                                accid = accid + Math.floor(Math.random() * 9)
                            }
                        }
                    }
                    while( (await db.query('SELECT Card_ID FROM UserCreditCard WHERE Card_ID = ?', [accid])).length != 0 )
                    console.log(accid)
                    const date = new Date()
                    insert_result = await db.query('\
                    INSERT INTO UserCreditCard (Card_ID, User_ID, Card_ExpireDate, Card_MaxAmount, Card_Status)\
                    VALUES \
                    (?, ?, ?, ?, ?)',
                    [accid, userid[0].User_ID, (('0' + (date.getMonth()+1)).slice(-2))+"/"+(date.getFullYear()+1), '10000.00', '01'])
                }
            }
            catch(e){
                console.log(e)
            }
            result = {
                status: 200,
                desc: insert_result
            }
        }
        else{
            result = {
                status: 404
            }
        }
        res.json(result)
    })
})

module.exports = router