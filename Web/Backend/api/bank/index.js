const express = require('express')
const router = express.Router()
const db = require('../mysql.config')

router.get('/list', async (req, res) => {
  let result = {}

  try{
    const bank_list = await db.query('SELECT External_BankShortName shortname, External_BankName title FROM ExternalBank ORDER BY External_BankName')
    result = {
      status: 200,
      data: bank_list
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

router.get('/info/:shortname', async (req, res) => {
  let result = {}

  try{
    const bankdata = await db.query('SELECT External_BankID id, External_BankShortName shortname, External_BankName title FROM ExternalBank WHERE External_BankShortName = ?', [req.params.shortname])
    result = {
      status: 200,
      data: bankdata[0]
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