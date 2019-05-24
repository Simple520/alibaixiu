// 负责所有的与登录相关的路由
const express = require('express')
const loginContr = require('../controller/loginContr.js')
const router = express.Router()

router.get('/login',loginContr.getLogin)// 添加一个得到登录页面的路由
      .post('/loginPostData', loginContr.loginPostData) // 添加一个登录验证的路由
      .get('/loginOut',loginContr.loginOut)
module.exports = router