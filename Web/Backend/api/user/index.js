const express = require('express')
const router = express.Router();
const db = require('../mysql.config')

//Get All users
router.get('/get/all', async (req, res) => {
    var result = {}

    try{
        var db_data = await db.query('SELECT * FROM User')
        result = {
            status: 200,
            data: db_data
        }
    }
    catch(err){
        console.log(err)
        result = {
            status: 500,
            comment: "mysql error"
        }
    }
    res.json(result)
})

//Get users by 
router.get('/get/id/:id', async (req, res) => {
    var result = {}

    try{
        var db_data = await db.query('SELECT * FROM User WHERE User_ID = ?', [req.params.id])
        if(db_data.length > 0){
            result = {
                status: 200,
                data: db_data
            }
        }
        else{
            result = {
                status: 404,
                comment: "not found"
            }
        }
        
    }
    catch(err){
        console.log(err)
        result = {
            status: 500,
            comment: "mysql error"
        }
    }
    res.json(result)
})

module.exports = router