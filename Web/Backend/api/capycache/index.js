module.exports = class CapyCache {
    constructor () {
        this.redis =  require('../redis.config')
    }

    set (name, exp, value) {
        if(this.redis === true){
            console.log("Redis: Cache Set")
            this.redis.setex(name, exp, JSON.stringify(value))
            return true
        }
        else{
            // Cache disable
            return true
        }
    }

    async get (name) {
        if(this.redis === true){
            console.log("Redis: Cache get")
            const result = await this.redis.get(name)
            if(result){
                console.log(JSON.parse(result))
                return JSON.parse(result)
            }
            else{
                return false
            }
        }
        else{
            // Cache disable
            return false
        }
    }

    async del (name){
        if(this.redis === true){
            await this.redis.del(name)
        }
        return true
    }
}