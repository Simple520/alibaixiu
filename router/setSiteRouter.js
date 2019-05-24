// 网站设置相关路由
const express = require('express')
const setSiteContr = require('../controller/setSiteContr.js')
const router = express.Router()
router.get('/nav-menus', setSiteContr.getPages)
      .get('/getnavMenuList', setSiteContr.getnavMenuList)
      .post('/addNavList', setSiteContr.addNavList) // 用于添加导航分类的路由
      .get('/slide', setSiteContr.getSlide)  // 得到网站设置的图片轮播设置页面
      .get('/settings', setSiteContr.settings) // 得到网站设置静态页面
module.exports = router