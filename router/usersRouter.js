// 处理所有与 用户相关的路由
const express = require('express')
const userContr = require('../controller/usersContr.js')
const router = express.Router()

// 注意这个添加这个中间件不能在loginRouter路由之前注册userRouter.js
// 否则会发生一件一直都是 '你还没有登录'的弹出登录提示框
// 原因： 因为如果将该路由放在最前面，执行任何请求对应的路由都会执行该中间件
// 只要不符合中间件里面的处理逻辑，就不会往下执行后面的代码
// 解决方案: 在app.js 中将loginRouter路由注册提前
router.use((req, res, next) => {
        // 验证是否登录
        if (req.session.user) {
                next()
        } else {
                // 还没有登录，跳转到登录页面
                res.send(`<script>alert('你还没有登录');window.location='/login'</script>`)
        }
})

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