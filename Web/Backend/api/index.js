import express from 'express'
const Welcome = require('./welcome')
const User = require('./user')
const Staff = require('./staff')
const Bank = require('./bank')
const Gateway = require('./gateway')
const TransferDebit = require('./transfer/debit')
const Create = require('./create')
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
app.use('/staff', Staff)
app.use('/bank', Bank)
app.use('/gateway', Gateway)
app.use('/transfer/debit', TransferDebit)
app.use('/create', Create)
/*
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}