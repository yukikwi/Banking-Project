import express from 'express'
const Welcome = require('./welcome')
const User = require('./user')
const Bank = require('./bank')
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
app.use('/user', User)
app.use('/bank', Bank)
/*
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}