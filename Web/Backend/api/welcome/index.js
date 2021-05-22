var express = require('express')
var router = express.Router();
const redisClient = require('../redis.config')

router.get('/', (req, res) => {
    const test = {
        status: 200,
        comment: 'Bara'
    }

    res.json(test)
})

router.get('/cache/test', async (req, res) => {
    const test = {
        status: 200,
        comment: 'Bara'
    }
    await redisClient.set("test", JSON.stringify(test))
    cached = await redisClient.get("test")
    if (cached) {
        console.log(JSON.parse(cached))
    }

    res.json(test)
})

module.exports = router