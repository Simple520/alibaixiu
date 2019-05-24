// 引入 postadddb
const postadddb = require('../model/postadddb.js')

// 引入第三方包: formidable包 ,用于接收上传的文件
const formidable = require('formidable')

// 引入核心模块 path
const path = require('path')
module.exports = {
    // 响应添加文章页面的内容
    postadd: (req, res) => {
        // 获取session中的nickname, avatar
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        let id = req.session.user.id
        // 响应渲染后的页面
        res.render('post-add', { nickname, avatar, id })
    },
    // 添加文章信息的逻辑
    postaddData: (req, res) => {
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

            if (files.imgFileObj) {
                let feature = '/static/uploads/' + path.basename(files.imgFileObj.path)
                fields.feature = feature
            } else {
                fields.feature = ''
            }
            // console.log(fields)
            postadddb.addData(fields, (err, result) => {
                if (err) {
                    res.send({
                        status: 400,
                        msg: '别名已经存在，请重新命名'
                    })
                } else {
                    res.send({
                        status: 200,
                        msg: '添加成功'
                    })
                }
            })

        })

    },
    // 获取 所有文章信息的 页面
    getposts: (req, res) => {
        // 获取session中的nickname, avatar
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        let id = req.session.user.id
        // 响应页面
        res.render('posts', { nickname, avatar, id })
    },
    // 获取所有文章记录
    getpostsData: (req, res) => {
        // 获取参数
        let page = req.query.page
        let pagesize = req.query.pagesize
        let category = req.query.category
        let status = req.query.status
        let obj = {
            page,
            pagesize,
            category,
            status
        }
        // 获取所有记录
        postadddb.getAllData(obj, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '查询成功',
                data: result
            })
        })

    },
    // 获取文章修改页面
    geteditPage: (req, res) => {
        // 获取avatar , nickname
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        
        res.render('post-edit', { nickname, avatar})
    },
    // 根据id 获取要编辑修改的数据
    postDataById: (req, res) => {
        // 获取参数
        let id = req.query.id
        // 执行sql 语句
        postadddb.postDataById(id, (err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            res.send({
                status: 200,
                msg: '获取成功',
                data: result
            })
        })
        
    },
    // 文章修改的处理逻辑
    updataPostedit: (req, res) => {
        // 获取所有的参数： 由于可能包含文件的表单，所以是哟个formiabe接收参数
        let form = new formidable.IncomingForm()
        // 设置文件上传路径
        form.uploadDir = path.join(__dirname, '../uploads')
        // 设置文件是否保存后缀
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            console.log(files)
            // 判断是否有文件上传
            if (files.feature) {
                 let imgPath = '/static/uploads/'+path.basename(files.feature.path)
                 fields.feature = imgPath
            } 
            // 更新到数据库中
            postadddb.updataEdit(fields, (err, result) => {
                if (err) {
                    return res.send({
                        status: 400,
                        msg: '出错啦'
                    })
                }
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            })
        })

    }
}

