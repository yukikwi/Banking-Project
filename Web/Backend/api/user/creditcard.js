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
            LEFT JOIN User ON UserCreditCard.User_ID = User.User_ID \
            LEFT JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ?',
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

router.post('/info', async (req, res) => {
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
            var db_data = await db.query('SELECT UserCreditCard.*, UserCreditCard.Card_MaxAmount - COALESCE(SUM(CreditCardHistory.CardHistory_Amount + CreditCardHistory.CardHistory_Fee),0) balance, UserCreditCard.Card_ID address FROM User \
            INNER JOIN UserCreditCard ON User.User_ID = UserCreditCard.User_ID \
            LEFT JOIN CreditCardHistory ON UserCreditCard.Card_ID = CreditCardHistory.Card_ID AND CreditCardHistory.CardHistory_Datetime LIKE ?\
            LEFT JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserCreditCard.Card_ID = ? \
            GROUP BY UserCreditCard.Card_ID',
            [ date.getFullYear()+"-"+(('0' + (date.getMonth()+1)).slice(-2))+"%", data.token, data.firstname, data.lastname, req.body.card_id ])

            if(db_data.length == 1){
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