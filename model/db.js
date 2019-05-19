// 执行所有与分类表相关的数据库操作
const mysql = require('mysql')

module.exports.query = (sql, callback) => {
    // 创建一个连接对象
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ailibaixiu'
    })
    // 用户链接
    connection.connect()
    // 执行 sql 语句

    //错误处理优化
    connection.query(sql, (err, result) => {
        // if (err) throw new Error
        if (err) {
            callback(err, null)
        }else {
            callback(null, result)
        }
        
      
    })
    // 关闭连接
    connection.end()
}