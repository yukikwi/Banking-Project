const express = require('express')
const router = express.Router()
const db = require('../mysql.config')
const config = require('../config')
const jwt = require('jsonwebtoken')

router.get('/list/unvalidate', async (req, res) => {
    // Split Token from Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    // If not login
    if (token == null) return res.sendStatus(401)

    let result = {
        status: 500,
        comment: "internal error"
    }

    await jwt.verify(token, config["jwtSecret"] , async (err, data) => {
        if (err) return res.sendStatus(403)
        let db_data = await db.query('SELECT Staff_ID, Staff_FName, Staff_Lname FROM Staff \
        INNER JOIN JWTAdmin ON Staff.Staff_ID = JWTAdmin.User_ID \
        WHERE JWTAdmin.accessToken = ? AND Staff.Staff_FName = ? AND Staff.Staff_Lname = ?', [data.token, data.firstname, data.lastname])
        if(db_data.length > 0){
            try{
                db_data = await db.query('SELECT User_ID, User_FName, User_LName FROM User WHERE User_Active_Status = \'02\'')
                result = {
                    status: 200,
                    detail: db_data
                }
            }
            catch (e) {
                console.log(e)
                result = {
                    status: 500,
                    comment: "internal error",
                    desc: e
                }
            }
        }
        else{
            result = {
                status: 404
            }
        }
    })
    res.json(result)
})

module.exports = router