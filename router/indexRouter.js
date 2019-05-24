const express = require('express')
// 引入indexContr.js
const indexContr = require('../controller/indexContr.js')
const router = express.Router()
router.get('/index', indexContr.getIndexPage)
        .get('/renderDate', indexContr.renderDate)
module.exports = router