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
                db_data = await db.query('SELECT User_ID, User_FName, User_LName, User_Validate_File FROM User WHERE User_Active_Status = \'02\'')
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

router.get('/download/identity/:file', async (req, res) => {
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
            const file = __dirname+'/../upload/identity/'+req.params.file
            res.download(file)
        }
        else{
            res.send('Capybara God not let you here')
        }
    })
})

router.get('/validate/:id/:status', async (req, res) => {
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
                let admin_log = await db.query('INSERT INTO `ApproveLog` (`Log_ID`, `User_ID`, `Staff_ID`, `Approve_Status`) \
                VALUES \
                (NULL, ?, ?, ?)',
                [parseInt(req.params.id), db_data[0].Staff_ID, (req.params.status === 'approve')? '00' : (req.params.status === 'decline')? '03':'01'])
                let update_data = await db.query('UPDATE User SET User_Active_Status = ? WHERE User_ID = ?', [(req.params.status === 'approve')? '00' : (req.params.status === 'decline')? '03':'01', parseInt(req.params.id)])
                result = {
                    status: 200,
                    desc: update_data
                }
            }
            catch (e) {
                console.log(e)
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

router.get('/age/:mode', async (req, res) => {
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
            if(req.params.mode === 'mean') {
                db_data = await db.query('SELECT AVG(DATEDIFF(CURRENT_DATE, User_DOB)/365) data FROM User')
                console.log(db_data)
                result = {
                    status: 200,
                    data: db_data[0].data
                }
            }
            if(req.params.mode === 'max') {
                db_data = await db.query('SELECT MAX(DATEDIFF(CURRENT_DATE, User_DOB)/365) data FROM User')
                console.log(db_data)
                result = {
                    status: 200,
                    data: db_data[0].data
                }
            }
            if(req.params.mode === 'min') {
                db_data = await db.query('SELECT MIN(DATEDIFF(CURRENT_DATE, User_DOB)/365) data FROM User')
                console.log(db_data)
                result = {
                    status: 200,
                    data: db_data[0].data
                }
            }
            if(req.params.mode === 'summary') {
                db_data_l20 = await db.query('SELECT COUNT(*) count FROM User WHERE DATEDIFF(CURRENT_DATE, User_DOB)/365 <= 20')
                db_data_2140 = await db.query('SELECT COUNT(*) count FROM User WHERE DATEDIFF(CURRENT_DATE, User_DOB)/365 >= 20 AND DATEDIFF(CURRENT_DATE, User_DOB)/365 <= 40')
                db_data_4160 = await db.query('SELECT COUNT(*) count FROM User WHERE DATEDIFF(CURRENT_DATE, User_DOB)/365 >= 41 AND DATEDIFF(CURRENT_DATE, User_DOB)/365 <= 60')
                db_data_m61 = await db.query('SELECT COUNT(*) count FROM User WHERE DATEDIFF(CURRENT_DATE, User_DOB)/365 >= 61')
                result = {
                    status: 200,
                    data: {
                        l20: db_data_l20[0].count,
                        f21t40: db_data_2140[0].count,
                        f41t60: db_data_4160[0].count,
                        m61: db_data_m61[0].count
                    }
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

router.get('/list/log', async (req, res) => {
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
            let log_data = await db.query('SELECT \
            ApproveLog.Log_DateTime Log_DateTime, ApproveLog.Approve_Status Approve_Status, User.User_FName User_FName, User.User_LName User_LName, Staff.Staff_LName Staff_LName, Staff.Staff_LName Staff_LName \
            FROM ApproveLog\
            INNER JOIN User ON ApproveLog.User_ID = User.User_ID\
            INNER JOIN Staff ON ApproveLog.Staff_ID = Staff.Staff_ID\
            ORDER BY ApproveLog.Log_ID DESC LIMIT 10')
            result = {
                status: 200,
                data: log_data
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