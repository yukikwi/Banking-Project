const express = require('express')
const router = express.Router();
const db = require('../mysql.config')
const config = require('../config')
const jwt = require('jsonwebtoken')

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
        try{
            var db_data = await db.query('SELECT UserCreditCard.* FROM UserCreditCard \
            INNER JOIN User ON UserCreditCard.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?',
            [data.token, data.firstname, data.lastname])
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

router.post('/exist', async (req, res) => {
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
            var db_data = await db.query('SELECT * FROM UserCreditCard \
            INNER JOIN User ON UserCreditCard.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserCreditCard.Card_ID = ?'
            , [data.token, data.firstname, data.lastname, req.body.card_id])
            if(db_data.length > 0){
                result = {
                    status: true
                }
            }
            else{
                result = {
                    status: false
                }
            }
        } catch(err) {
            console.log(err)
            result = {
                status: false
            }
        }
        res.json(result)
    })
})

router.post('/history', async (req, res) => {
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
        try{
            var card_data = await db.query('SELECT UserCreditCard.*, MAX(CreditCardHistory.CardHistory_Amount) highest, MIN(CreditCardHistory.CardHistory_Amount) lowest, DATE(CardHistory_Datetime) date  FROM User \
            INNER JOIN UserCreditCard ON User.User_ID = UserCreditCard.User_ID \
            LEFT JOIN CreditCardHistory ON UserCreditCard.Card_ID = CreditCardHistory.Card_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserCreditCard.Card_ID = ?',
            [data.token, data.firstname, data.lastname, req.body.card_id ])

            var trans_data = await db.query('SELECT CreditCardHistory.*, Target.Target_Name, DATE(CreditCardHistory.CardHistory_Datetime) date, TIME(CreditCardHistory.CardHistory_Datetime) time FROM User \
            INNER JOIN UserCreditCard ON User.User_ID = UserCreditCard.User_ID \
            LEFT JOIN CreditCardHistory ON UserCreditCard.Card_ID = CreditCardHistory.Card_ID \
            INNER JOIN Target ON CreditCardHistory.Target_ID = Target.Target_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserCreditCard.Card_ID = ? ORDER BY CreditCardHistory.CardHistory_ID DESC',
            [data.token, data.firstname, data.lastname, req.body.card_id ])
            if(card_data.length == 1){
                let stat = {
                    label: [],
                    data: []
                }
                for(let days = 6; days >= 0; days --){
                    const date = new Date()
                    const last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))
                    let day = last.getDate()
                    day = ("0" + day).slice(-2)
                    let month = last.getMonth()+1
                    month = ("0" + month).slice(-2)
                    let year = last.getFullYear()
                    const data = await db.query('SELECT SUM(CardHistory_Amount) FROM CreditCardHistory WHERE DATE(CardHistory_Datetime) LIKE ?', [year+'-'+month+'-'+day])
                    stat.label.push(year+'-'+month+'-'+day)
                    stat.data.push((data[0]["SUM(CardHistory_Amount)"] === null)? 0:data[0]["SUM(CardHistory_Amount)"])
                }
                result = {
                    status: 200,
                    data: card_data[0],
                    transaction: trans_data,
                    stat: stat
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
router.post('/status', async (req, res) => {
    var result = {}
    console.log(req)
    var checked = req.body.check
    var cardID = req.body.cardID
    if (checked){
        checked = '01'
    }else {
        checked = '00'
    }
    console.log('checked : ',checked)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        try{
            console.log('token : ', data.token)
            var db_data = await db.query('UPDATE UserCreditCard \
            SET Card_Status = ? \
            WHERE Card_ID = ? AND \
            User_ID IN \
            (SELECT UserAccount.User_ID \
            FROM JWT, UserAccount \
            WHERE JWT.User_ID = UserAccount.User_ID AND JWT.accessToken = ?)',
            [checked, cardID, data.token])
            if(db_data.length > 0){
                result = {
                    status: 200,
                    data: db_data
                }
            }
            else{
                result = {
                    status: 404,
                    comment: "not found",
                    data: db_data
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
router.post('/accountInfo', async (req, res) => {
    var result = {}
    console.log(req.body)
    var cardID = req.body.cardID
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        try{
            var db_data = await db.query('SELECT User.User_FName, User.User_LName, UserCreditCard.*\
            FROM JWT, User, UserCreditCard\
            WHERE JWT.User_ID = UserCreditCard.User_ID AND\
            UserCreditCard.Card_ID = ? AND\
            User.User_ID = UserCreditCard.User_ID AND\
            JWT.accessToken = ?',[cardID, data.token])
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

module.exports = router