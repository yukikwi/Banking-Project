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
            var db_data = await db.query('SELECT * FROM UserAccount \
            INNER JOIN User ON UserAccount.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID = ?'
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
            // Get account data
            var db_data = await db.query(' \
            SELECT \
            UserAccount.*, \
            AccountType.*, \
            SUM( case when (TransactionsHistory.User_Target_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) account_in, \
            SUM( case when (TransactionsHistory.User_Sender_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount+TransactionsHistory.Trans_Fee else 0 end ) account_out, \
            (\
                SUM( case when (TransactionsHistory.User_Target_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount else 0 end ) \
                - \
                SUM( case when (TransactionsHistory.User_Sender_Internal_AccountID LIKE UserAccount.Account_ID) then TransactionsHistory.Trans_Amount+TransactionsHistory.Trans_Fee else 0 end ) \
            ) balance, \
            UserAccount.Account_ID address FROM User \
            INNER JOIN UserAccount ON User.User_ID = UserAccount.User_ID \
            INNER JOIN AccountType ON UserAccount.Account_Type = AccountType.Account_Type_ID \
            LEFT JOIN TransactionsHistory ON UserAccount.Account_ID = TransactionsHistory.User_Target_Internal_AccountID OR UserAccount.Account_ID = TransactionsHistory.User_Sender_Internal_AccountID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID = ?',
            [data.token, data.firstname, data.lastname, req.body.card_id])

            if(db_data.length == 1){
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

router.post('/transfer', async (req, res) => {
    //Get Transfer result
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        try{
            console.log(req.body.sender_addr)
            const fee_percentage = await db.query('SELECT Interest_Rate FROM UserAccount INNER JOIN AccountType ON UserAccount.Account_Type = AccountType.Account_Type_ID WHERE UserAccount.Account_ID LIKE ?', [req.body.sender_addr])
            console.log(fee_percentage[0].Interest_Rate)
            const fee = req.body.amount * (fee_percentage[0].Interest_Rate / 100)
            let db_data = {}
            // Is account owner
            console.log('Validate start...')
            const validate = await db.query('SELECT UserAccount.Account_ID FROM UserAccount \
            INNER JOIN User ON UserAccount.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID LIKE ?',
            [data.token, data.firstname, data.lastname, req.body.sender_addr])

            const internal_exist = await db.query('SELECT * FROM UserAccount WHERE Account_ID = ?', [req.body.card_id])
            let error = false
            if(internal_exist.length === 1){
                error = true
            }
            else{
                result = {
                    status: 500
                }
            }
            if (validate.length > 0 && error === false) {
                // To Internal
                if (req.body.mode === 'internal') {
                    console.log('Internal transfer...')
                    db_data = await db.query('INSERT INTO \
                    `TransactionsHistory` (\
                        `Trans_ID`, \
                        `User_Sender_Internal_AccountID`, \
                        `User_Sender_External_AccountID`, \
                        `User_Target_Internal_AccountID`, \
                        `User_Target_External_AccountID`, \
                        `User_Target_Bill_ID`, \
                        `Trans_Amount`, \
                        `Trans_Fee`, \
                        `Trans_DateTime`, \
                        `Trans_Note`, \
                        `Trans_type`, \
                        `External_BankID`\
                    ) VALUES (\
                        NULL, \
                        ?, \
                        NULL, \
                        ?, \
                        NULL, \
                        \'notbill\', \
                        ?, \
                        ?, \
                        current_timestamp(), \
                        ?, \
                        ?, \
                        NULL \
                    );', [
                        req.body.sender_addr,
                        req.body.target_addr,
                        req.body.amount,
                        fee,
                        req.body.note,
                        '00'
                    ])
                } else {
                    //External
                    console.log('External transfer...')
                    db_data = await db.query('INSERT INTO \
                    `TransactionsHistory` (\
                        `Trans_ID`, \
                        `User_Sender_Internal_AccountID`, \
                        `User_Sender_External_AccountID`, \
                        `User_Target_Internal_AccountID`, \
                        `User_Target_External_AccountID`, \
                        `User_Target_Bill_ID`, \
                        `Trans_Amount`, \
                        `Trans_Fee`, \
                        `Trans_DateTime`, \
                        `Trans_Note`, \
                        `Trans_type`, \
                        `External_BankID`\
                    ) VALUES (\
                        NULL, \
                        ?, \
                        NULL, \
                        NULL, \
                        ?, \
                        \'notbill\', \
                        ?, \
                        ?, \
                        current_timestamp(), \
                        ?, \
                        ?, \
                        ? \
                    );', [
                        req.body.sender_addr,
                        req.body.target_addr,
                        req.body.amount,
                        fee,
                        req.body.note,
                        '00',
                        req.body.target_bank
                    ])
                }
                result = {
                    status: 200,
                    data: db_data
                }
            }
            else{
                result = {
                    status: 404
                }
            }
        }
        catch(e){
            console.log(e)
            result = {
                status: 500
            }
        }
    })

    res.json(result)
})

router.post('/slip', async (req, res) => {
    //Get Slip
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        try{
            const db_data = await db.query('SELECT TransactionsHistory.*, ExternalBank.* FROM TransactionsHistory \
            LEFT JOIN UserAccount ON TransactionsHistory.User_Sender_Internal_AccountID = UserAccount.Account_ID  OR TransactionsHistory.User_Target_Internal_AccountID = UserAccount.Account_ID \
            LEFT JOIN ExternalBank ON TransactionsHistory.External_BankID = ExternalBank.External_BankID \
            INNER JOIN User ON UserAccount.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND TransactionsHistory.Trans_ID = ?',
            [data.token, data.firstname, data.lastname, req.body.transaction])
            if(db_data.length == 1){
                result = {
                    status: 200,
                    data: db_data[0]
                }
            }
            else{
                result = {
                    status: 404
                }
            }
        }
        catch(e){
            console.log(e)
            result = {
                status: 500
            }
        }
    })

    res.json(result)
})
router.post('/status', async (req, res) => {
    var result = {}
    var checked = req.body['checked']
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
            var db_data = await db.query('UPDATE UserAccount \
            SET Account_Status = ?\
            WHERE User_ID = (SELECT UserAccount.User_ID\
            FROM JWT, UserAccount  \
            WHERE JWT.User_ID = UserAccount.User_ID AND JWT.accessToken = ?)',[checked,data.token])
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
router.post('/billpay', async (req, res) => {
    //Get Transfer result
    var result = {}

    //Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //If not login
    if (token == null) return res.sendStatus(401)

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        try{
            console.log(req.body.sender_addr)
            const fee_percentage = await db.query('SELECT Interest_Rate FROM UserAccount INNER JOIN AccountType ON UserAccount.Account_Type = AccountType.Account_Type_ID WHERE UserAccount.Account_ID LIKE ?', [req.body.sender_addr])
            console.log(fee_percentage[0].Interest_Rate)
            const fee = req.body.amount * (fee_percentage[0].Interest_Rate / 100)
            let db_data = {}
            // Is account owner
            console.log('Validate start...')
            const validate = await db.query('SELECT UserAccount.Account_ID FROM UserAccount \
            INNER JOIN User ON UserAccount.User_ID = User.User_ID \
            INNER JOIN JWT ON User.User_ID = JWT.User_ID WHERE JWT.accessToken = ? AND User.User_FName = ? AND User.User_LName = ? AND UserAccount.Account_ID LIKE ?',
            [data.token, data.firstname, data.lastname, req.body.sender_addr])

            const internal_exist = await db.query('SELECT * FROM UserAccount WHERE Account_ID = ?', [req.body.card_id])
            let error = false
            if(internal_exist.length === 1){
                error = true
            }
            else{
                result = {
                    status: 500
                }
            }
            if (validate.length > 0 && error === false) {
                console.log('Internal transfer...')
                db_data = await db.query('INSERT INTO \
                `TransactionsHistory` (\
                    `Trans_ID`, \
                    `User_Sender_Internal_AccountID`, \
                    `User_Sender_External_AccountID`, \
                    `User_Target_Internal_AccountID`, \
                    `User_Target_External_AccountID`, \
                    `User_Target_Bill_ID`, \
                    `Trans_Amount`, \
                    `Trans_Fee`, \
                    `Trans_DateTime`, \
                    `Trans_Note`, \
                    `Trans_type`, \
                    `External_BankID`\
                ) VALUES (\
                    NULL, \
                    ?, \
                    NULL, \
                    NULL, \
                    NULL, \
                    ?, \
                    ?, \
                    ?, \
                    current_timestamp(), \
                    ?, \
                    ?, \
                    NULL \
                );', [
                    req.body.sender_addr,
                    req.body.target_addr,
                    req.body.amount,
                    fee,
                    req.body.note,
                    '00'
                ])
                result = {
                    status: 200,
                    data: db_data
                }
            }
            else{
                result = {
                    status: 404
                }
            }
        }
        catch(e){
            console.log(e)
            result = {
                status: 500
            }
        }
    })

    res.json(result)
})
module.exports = router