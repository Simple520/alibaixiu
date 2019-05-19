// 处理所有与登录相关的操作
const db = require('./db.js')
module.exports = {
    query: db.query,
    // 根据邮箱验证密码
    getPwdByEmail: (email, callback) => {
        // 执行sql语句
        let sql = `SELECT password FROM users WHERE email = '${email}'`
        // console.log(sql)
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}