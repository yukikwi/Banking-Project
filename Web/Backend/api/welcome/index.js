var express = require('express')
var router = express.Router();

router.get('/', (req, res) => {
    const test = {
        status: 200,
        comment: 'Bara'
    }

    res.json(test)
})

module.exports = router