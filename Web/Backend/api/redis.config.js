
const util = require('util')
const redis = require('redis')
const config = require('./config')
let redisClient
if(config["cache"] === true){
    redisClient = redis.createClient({
        host: '165.232.161.150'
    })

    redisClient.on("error", function(error) {
        console.error(error)
    });

    redisClient.get = util.promisify(redisClient.get).bind(redisClient)
    redisClient.set = util.promisify(redisClient.set).bind(redisClient)
    redisClient.setex = util.promisify(redisClient.setex).bind(redisClient)
}
else{
    redisClient = false
}
module.exports = redisClient