// 引入 indexdb
const indexdb = require('../model/indexdb.js')
module.exports = {
    // 1.0 响应index静态页面
    getIndexPage: (req, res) => {
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('index', {nickname, avatar})
    },
    // 2.0 响应页面需要的数据
    renderDate: (req, res) => {
        indexdb.getData((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '粗错啦'
                })
            }
            res.send({
                status: 200,
                msg: '获取成功',
                data: result
            })
        })
    }
}