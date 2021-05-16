const express = require('express')
const router = express.Router()
const db = require('../mysql.config')

//CC validate
router.post('/validate', async (req, res) => {
    let result = {}
    try{
        var d = new Date(req.body.expire)
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        const expire = '0'+month+'/'+year
        const data = await db.query('SELECT Card_ID FROM UserCreditCard INNER JOIN User ON User.User_ID = UserCreditCard.User_ID \
        WHERE UserCreditCard.Card_ID LIKE ? AND UserCreditCard.Card_ExpireDate LIKE ? AND UserCreditCard.Card_Status LIKE "01"\
        AND User.User_FName = ? AND User.User_LName = ?',
        [req.body.cardNumber, expire.slice(-7), req.body.fname, req.body.lname])
        if(data.length == 1){
            result = {
                status: 200
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

    res.json(result)
})

router.get('/target/list', async (req, res) => {
    let result = {}
    try{
        const data = await db.query('SELECT Target_ID, Target_Name FROM Target')
        if(data.length > 0){
            result = {
                status: 200,
                list: data
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
    res.json(result)
})

//CC validate
router.post('/pay', async (req, res) => {
    let result = {}
    try{
        var expire_d = new Date(req.body.expire)
        var month = expire_d.getMonth() + 1
        var year = expire_d.getFullYear()
        const expire = '0'+month+'/'+year

        var now_d = new Date()
        var month = ('0'+(now_d.getMonth() + 1)).slice(-2)
        var year = now_d.getFullYear()
        const current_MY = year+'-'+month+'%'
        console.log(current_MY)
        const data = await db.query('SELECT UserCreditCard.Card_ID, UserCreditCard.Card_MaxAmount - SUM(CreditCardHistory.CardHistory_Amount + CreditCardHistory.CardHistory_Fee) Card_Amount, UserCreditCard.Card_MaxAmount FROM UserCreditCard \
        LEFT JOIN CreditCardHistory ON CreditCardHistory.Card_ID = UserCreditCard.Card_ID AND CardHistory_Datetime LIKE ?\
        INNER JOIN User ON User.User_ID = UserCreditCard.User_ID \
        WHERE UserCreditCard.Card_ID LIKE ? AND UserCreditCard.Card_ExpireDate LIKE ? AND UserCreditCard.Card_Status LIKE "01"\
        AND User.User_FName LIKE ? AND User.User_LName LIKE ? GROUP BY UserCreditCard.Card_ID',
        [current_MY, req.body.cardNumber, expire.slice(-7), req.body.fname, req.body.lname])
        console.log(data)
        if(data.length == 1){
            // Found
            console.log('Card Found')
            if ((data[0].Card_Amount === null && data[0].Card_MaxAmount >= req.body.amount) || data[0].Card_Amount >=req.body.amount) {
                console.log('Credit Enough')
                try{
                    const amount = req.body.amount * 0.97
                    const fee = req.body.amount * 0.03
                    console.log(amount)
                    console.log(fee)
                    const insert_result = await db.query('INSERT INTO `CreditCardHistory` (`CardHistory_ID`, `Card_ID`, `Target_ID`, `CardHistory_Amount`, `CardHistory_Datetime`, `CardHistory_Fee`) \
                    VALUES\
                    (NULL, ?, ?, ?, current_timestamp(), ?)',
                    [req.body.cardNumber, req.body.target, amount, fee])
                    console.log(insert_result)
                    result = {
                        status: 200,
                        data: insert_result
                    }
                }
                catch (e) {
                    console.log(e)
                    result = {
                        status: 500
                    }
                }
            }
            else{
                console.log('Credit not enough')
                result = {
                    status: 403
                }
            }
        }
        else{
            console.log('Card not found')
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

    res.json(result)
})

module.exports = router