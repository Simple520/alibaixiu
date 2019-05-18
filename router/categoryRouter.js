//处理所有与文章分类的路由
const express = require('express')
const router = express.Router()
const categoryContr = require('../controller/categoryContr.js')

router.get('/category', categoryContr.category) //获取分类页面的路由
      .get('/getAllCategroies', categoryContr.getAllCategroies) //获取所有分类信息的路由
      .post('/addCategroies', categoryContr.addCategroies) //添加分类的路由
      .get('/delById', categoryContr.delById) //添加一单个删除分类的路由
      .get('/getIDInfor', categoryContr.getIDInfor) //添加一个更具id获取分类信息的路由
      .post('/ediCategytPost', categoryContr.ediCategytPost) //添加一个修改分类后重新提交的路由
      .post('/delCategories', categoryContr.delCategories) //添加一个批量删除的路由
module.exports = router