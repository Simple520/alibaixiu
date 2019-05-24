// 引入 logindb
const logindb = require('../model/logindb.js')

module.exports = {
    // 渲染页面
    getLogin: (req, res) => {
        res.render('login',{})
    },
    // 提交登录数据的方法
    loginPostData: (req, res) => {
        // 1.0 接收提交的参数
        let params = req.body
        // console.log(params)
        // 2.0 调用 db 中的方法来验证参数的合法性
        logindb.getPwdByEmail(params.email, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '验证出错'
                })
            }
            if (result.length == 0) {
                return res.send({
                    status: 401,
                    msg: '邮箱或者密码不正确'
                })
            }
            if (result[0].password != params.password) { 
                return res.send({
                    status: 401,
                    msg: '密码不正确'
                })
            }
            // 登录成功
            // 要将用户的登录信息保存起来
            // 暂时有一个问题存在： user 中存的应该是用户名，而不是邮箱
            req.session.user = {
                email: params.email,
                password: params.password,
                nickname: result[0].nickname,
                id: result[0].id,
                slug:result[0].slug,
                avatar: result[0].avatar,
                bio: result[0].bio
            }
            //   console.log(req.session.user.avatar)
            res.send({
                status: 200,
                msg: '登录成功'
            })
        })
        
    },
    // 删除登录信息
    loginOut: (req,res) => {
        if (req.session.user) {
            // console.log('get session')
            // 清除session
            req.session.user = null
            res.send({
                status: 200,
                msg: '退出成功'
            })
        }
    }
}