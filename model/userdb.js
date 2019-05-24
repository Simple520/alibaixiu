// // 执行所有与用户表相关的数据库操作
// const mysql = require('mysql')

// module.exports.query = (sql, callback) => {
//     // 创建一个连接对象
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'ailibaixiu'
//     })
//     // 用户链接
//     connection.connect()
//     // 执行 sql 语句

//     //错误处理优化
//     connection.query(sql, (err, result) => {
//         // if (err) throw new Error
//         if (err) {
//             callback(err, null)
//         }else {
//             callback(null, result)
//         }
        
      
//     })
//     // 关闭连接
//     connection.end()
// }
let db = require('./db.js')
module.exports = {
    query: db.query,
    profileUpdata: (obj, callback) => { // obj 为参数对象
        // 执行sql语句
        let sql = `UPDATE users SET email= '${obj.email}', avatar= '${obj.avatar}', slug= '${obj.slug}', nickname= '${obj.nickname}', bio = '${obj.bio}' WHERE id =${obj.id}`
        // console.log(sql)
        db.query(sql, (err,result) => {
            callback(err, result)
        })
    },
    // 根据id获取旧密码
    getpwdById: (id, callback) => {
        // 执行sql语句
        let sql = `SELECT * FROM users WHERE id =${id}`
        db.query(sql, (err,result) => {
            callback(err, result)
        })
    },
    // 修改密码
    updatepwd: (newpwd, id, callback) => {
        // 执行sql语句
         let sql = `UPDATE users SET password = '${newpwd}' WHERE id=${id}`
         db.query(sql, (err,result) => {
            callback(err, result)
        })
    }
}