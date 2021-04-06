import express from 'express'
const Welcome = require('./welcome')
const user = require('./user')
const config = require('./config')
const app = express()

app.use(express.json())

app.all('*', function (req, res, next) {
    //Debugging to console
    if(config["debug_mode"] == true){
        console.log("Request slug: "+req.originalUrl)
    }
    next();
})

app.use('/welcome', Welcome)
app.use('/user', user)
/** 
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}