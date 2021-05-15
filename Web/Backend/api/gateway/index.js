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

module.exports = router