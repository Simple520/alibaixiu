// 引入 userdb
const userdb = require('../model/userdb.js')

// 引入第三方包: formidable包 ,用于接收上传的文件
const formidable = require('formidable')

// 引入核心模块 path
const path = require('path')

module.exports = {
    // 1.0   处理所有与 用户 相关的逻辑
    getUsers: (req, res) => {
        if (isBroLogin(req, res)) {
            return  // 如果不是，不继续执行下面代码
        }
        userdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return res.send(`<script>alert(${err.message})</script>`)
            }
            // 渲染页面 ，渲染数据
            // 将昵称显示
            let nickname = req.session.user.nickname
            let avatar = req.session.user.avatar
            res.render('users', { result, nickname, avatar })
        })
    },
    //2.0  添加用户数据
    addUsers: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        //接收提交的参数
        var params = req.body
        if (params.slug == '' || params.email == '' || params.password == '') {
            return res.send({
                status: 400,
                msg: '添加失败: 邮箱 ， 密码，用户名必填'
            })
        }
        // 2.0 将数据提交到数据库
        let addSql = `INSERT INTO users (slug, email, password, nickname, status) VALUES ('${params.slug}','${params.email}','${params.password}','${params.nickname}','activated')`
        // 3.0 执行 sql 语句
        userdb.query(addSql, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '添加失败: 邮箱已经被注册'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '新增用户成功'
                })
            }
        })
    },
    //3.0 处理获取所有用户的请求
    getAllUsers: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        userdb.query(`SELECT * FROM users`, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '获取失败'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '获取成功',
                    data: result
                })
            }
        })
    },

    //4.0 处理删除用户的路由
    delUser: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        //获取get请求的参数 id
        let id = req.query.id
        //console.log(id)
        userdb.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '出错啦，删除失败'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '删除成功'
                })
            }
        })
    },

    //5.0根据id响应数据
    getIdData: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        //获取id
        let id = req.query.id
        // console.log(id)
        userdb.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {

            // console.log(result)
            if (err) {
                res.send({
                    status: 400,
                    msg: '出错啦',
                })
            } else {
                res.send({
                    status: 200,
                    msg: '成功获取数据',
                    data: result[0]
                })
            }
        })
    },


    //6.0 处理修改后的表单提交数据
    editPost: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        //获取参数
        let params = req.body
        // console.log(params)
        let editSql = `UPDATE  users SET email = '${params.email}' , nickname = '${params.nickname}' , password = '${params.password}' WHERE id = ${params.id}`
        userdb.query(editSql, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '出错啦'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            }
        })
    },

    //7.0 处理批量删除的逻辑
    delUsers: (req, res) => {
        if (isXHRLogin(req, res)) {
            return
        }
        //获取post提交的参数
        let params = req.body
        // console.log(params) //{ id: [ '1', '2', '36' ] }
        let idArr = params.id
        //将数组转化为字符串
        let str = idArr.join(',')
        //console.log(str)

        //执行sql语句
        userdb.query(`DELETE  FROM users WHERE id in (${str})`, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '出错啦'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '批量删除成功'
                })
            }

        })
    },
    profile: (req, res) => {
        // 获取session
        let nickname = req.session.user.nickname
        let email = req.session.user.email
        let slug = req.session.user.slug
        let bio = req.session.user.bio
        let id = req.session.user.id
        let avatar = req.session.user.avatar
        res.render('profile', { nickname, email, slug, bio, id, avatar })

    },
    profileUpDate: (req, res) => {
        // 获取提交的参数
        // 由于表单中含有文件,所以要使用formidable第三方包
        let form = new formidable.IncomingForm()
        // 设置文件上传的路径
        form.uploadDir = path.join(__dirname, '../uploads')
        // 设置是否保存上传文件的后缀名
        form.keepExtensions = true
        // 方法调用
        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }

            if (files.avatar) {
                let imgpath = '/static/uploads/' + path.basename(files.avatar.path)
                fields.avatar = imgpath
            }
            req.session.user.nickname = fields.nickname
            req.session.user.avatar = fields.avatar
            // console.log(fields)
            // 数据更新到数据库中
            userdb.profileUpdata(fields, (err2, result) => {
                if (err2) {
                    return res.send({
                        status: 400,
                        msg: '修改失败'
                    })
                }
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            })

        })

    },
    // 获取修改密码的页面
    password_reset: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('password-reset', { nickname, avatar })
    },
    // 更新密码
    updatapwd: (req, res) => {
        // 获取参数

        // let form = new formidable.IncomingForm()
      
        // form.parse(req, (err, fields, files) => {
        //     console.log(12342143)
        //     if (err) {
        //         console.log('粗错啦')
        //     } else {
        //         console.log(fields.old)
        //     }
        // })


        let password = req.body.password
        let old = req.body.old
        let id = req.session.user.id
        // 获取当前登录用户的pwd
        // let nowpwd = ''
        userdb.getpwdById(id, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            if (old == result[0].password) {
                //  将数据添加到数据库
                userdb.updatepwd(password, id, (err2, result2) => {
                    if (err2) {
                        return res.send({
                            status: 400,
                            msg: '出错啦'
                        })
                    }
                    // 清空session
                    req.session.user = null
                    res.send({
                        status: 200,
                        msg: '密码修改成功'
                    })


                })
            } else {
                res.send({
                    status: 400,
                    msg: '旧密码验证失败'
                })
            }

        })

    }
}

// 封装一个函数，验证是否登录
function isXHRLogin(req, res) {
    if (!req.session.user) {
        res.send({
            status: 304,
            msg: '还没有登录'
        })
        return true
    }
    return false
}

function isBroLogin(req, res) {
    if (!req.session.user) {
        res.send(`<script>alert('你还没有登录');window.location='/login'</script>`)
        return true
    }
    return false
}