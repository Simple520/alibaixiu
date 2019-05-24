// 职责：开启服务器
// 1.0 引入 express
// 2.0 搭建服务器
// 3.0 处理静态文件
// 4.0 处理路由文件
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
// const demoRouter = require('./router/demoRouter.js')
const usersRouter = require('./router/usersRouter.js')
const categoryRouter = require('./router/categoryRouter.js')
const loginRouter = require('./router/loginRouter.js')
const postAddRouter = require('./router/postAddRouter.js') // 添加文章页面相关路由
const setSiteRouter = require('./router/setSiteRouter.js')
const indexRouter = require('./router/indexRouter.js')
const app = express()

// 配置 ejs 模板引擎
app.set('views', './views') // 设置模板引擎的静态页面
app.set('view engine', 'ejs') // 设置渲染模板使用的引擎

// 配置Session
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))  

// 配置静态文件
app.use('/assets', express.static('./assets'))
app.use('/static/uploads', express.static('./uploads'))
app.use('/public/assets', express.static('./assets'))
app.use('/public',express.static('./public'))

//配置bodyParser  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 注册路由中间件
app.use(loginRouter) //  登录相关路由 loginRouter 该路由不需要经过登录验证后执行
app.use(usersRouter)  // 用户操作相关的
app.use(categoryRouter) // 文章分类操作相关的路由
app.use(postAddRouter)  // 添加文章内容的相关路由
app.use(setSiteRouter)  // 网站设置相关路由
app.use(indexRouter)  // 后台管理页面的首页相关路由
app.listen(3000, () => {
    console.log('服务器已经开启：localhost:3000/')
})