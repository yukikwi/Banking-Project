const express = require('express')
const router = express.Router();
const db = require('../mysql.config')

//Get All users
router.get('/get/all', (req, res) => {
    db.query('SELECT * FROM User', function (error, results, fields) {
        var result = {}
        if (error){
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
        else{
            result = {
                status: 200,
                data: results
            }
        }
        res.json(result)
    })
})

//Get users by 
router.get('/get/id/:id', (req, res) => {
    db.query('SELECT * FROM User WHERE User_ID = ?', [req.params.id], function (error, results, fields) {
        var result = {}
        if (error){
            result = {
                status: 500,
                comment: "mysql error"
            }
        }
        else{
            result = {
                status: 200,
                data: results
            }
        }
        res.json(result)
    })
})

module.exports = router