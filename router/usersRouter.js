// 处理所有与 用户相关的路由
const express = require('express')
const userContr = require('../controller/usersContr.js')
const router = express.Router()

// 得到静态页面
router.get('/users', userContr.getUsers)
        .post('/addUser', userContr.addUsers)// 添加用户的路由
        .get('/getAllUsers',userContr.getAllUsers)//添加获取所有用户的路由
        .get('/delUser',userContr.delUser)//添加删除用户的路由
        .get('/getIdData',userContr.getIdData)//添加一个根据用户id获取数据的路由
        .post('/editPost',userContr.editPost)//添加一个处理修改用户信息后提交的路由
        .post('/delUsers',userContr.delUsers)//添加一个处理批量删除的路由

//优化代码 ： 1.0 具名函数 2.0express的链式编程特点


// 暴露接口
module.exports = router