const express = require('express')
const postAddContr = require('../controller/postAddContr.js')
const router = express.Router()
router.get('/postadd', postAddContr.postadd)
      .post('/postadd-data', postAddContr.postaddData)
      .get('/posts', postAddContr.getposts) // 获得页面
      .get('/getpostsData', postAddContr.getpostsData)
      .get('/post-edit', postAddContr.geteditPage)
      .get('/postDataById', postAddContr.postDataById)
      .post('/updataPostedit', postAddContr.updataPostedit) // 修改文章后提交的路由

module.exports = router