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
            // Get account data
            var db_data = await db.query(' \
            SELECT \
            UserAccount.*, \
            SUM( case when (TransactionsHistory.User_Target_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) account_in, \
            SUM( case when (TransactionsHistory.User_Sender_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) account_out, \
            (\
                SUM( case when (TransactionsHistory.User_Target_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) \
                - \
                SUM( case when (TransactionsHistory.User_Sender_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) \
            ) balance, \
            UserAccount.Account_ID address FROM User \
            INNER JOIN UserAccount ON User.User_ID = UserAccount.User_ID \
            LEFT JOIN TransactionsHistory ON UserAccount.Account_ID = TransactionsHistory.User_Target_Internal_AccountID OR UserAccount.Account_ID = TransactionsHistory.User_Sender_Internal_AccountID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID = ?',
            [data.token, data.firstname, data.lastname, req.body.card_id])

            if(db_data.length > 0){
                var transactiondata = await db.query(' \
                SELECT \
                TransactionsHistory.*, \
                DATE(TransactionsHistory.Trans_DateTime) Date, \
                TIME(TransactionsHistory.Trans_DateTime) Time \
                FROM User \
                INNER JOIN UserAccount ON User.User_ID = UserAccount.User_ID \
                LEFT JOIN TransactionsHistory ON UserAccount.Account_ID = TransactionsHistory.User_Target_Internal_AccountID OR UserAccount.Account_ID = TransactionsHistory.User_Sender_Internal_AccountID \
                INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID = ? ORDER BY TransactionsHistory.Trans_ID DESC',
                [data.token, data.firstname, data.lastname, req.body.card_id])
                result = {
                    status: 200,
                    data: db_data[0],
                    transaction: transactiondata
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