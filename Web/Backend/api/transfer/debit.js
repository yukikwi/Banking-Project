const express = require('express')
const router = express.Router()
const db = require('../mysql.config')
const CapyCache = require('../capycache/index')
const cache = new CapyCache()

//CC validate
router.post('/exist', async (req, res) => {
    let result = {}
    const getcache = await cache.get('debit.exist.'+req.body.card_id)
    console.log(req.body.card_id)

    if(getcache === false){
        const card = await db.query('SELECT * FROM UserAccount WHERE Account_ID = ?', [req.body.card_id])
        if (card.length === 1) {
            result = {
                status: 200
            }
        }
        else {
            result = {
                status: 404
            }
        }
        cache.set('debit.exist.'+req.body.card_id, 5, JSON.stringify(result))
    }
    else{
        result = getcache
    }

    res.json(result)
})

module.exports = router