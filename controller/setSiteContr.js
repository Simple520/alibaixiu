// 这是与网站设置相关的路由处理逻辑
const setSitedb = require('../model/setSitedb.js')
module.exports = {
    // 获取页面
    getPages: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('nav-menus', { nickname, avatar })
    },
    // 获取所有导航数据
    getnavMenuList: (req, res) => {
        setSitedb.getnavList((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '获取数据失败'
                })
            }
            res.send({
                status: 200,
                msg: '获取数据成功',
                data: result
            })
        })
    },
    //  添加导航的路由
    addNavList: (req, res) => {
        // 获取参数
        let params = req.body
        // console.log(params) [Object: null prototype] { text: '123', title: '123', href: '#' }
        let flag = 1
        for (var key in params) {
            flag = params[key] == '' ? 0 : flag
        }
        if (flag) {
            // 添加到数据库
            setSitedb.addnavList(params, (err, result) => {
                if (err) {
                    return res.send({
                        status: 400,
                        msg: '出错啦'
                    })
                }
                res.send({
                    status: 200,
                    msg: '添加成功'
                })
            })
        } else {
            res.send({
                status: 400,
                msg: '请把表单填写完整'
            })
        }
    },
    // 获取轮播图页面
    getSlide: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('slide', { nickname, avatar })
    },
    // 获取网站设置页面
    settings: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('settings', { nickname, avatar })
    }
}
