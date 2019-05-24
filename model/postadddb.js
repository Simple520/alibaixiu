// 执行post表的操作
const db = require('./db.js')
module.exports = {
    query: db.query,
    addData: (obj,callback) => {
        // 执行sql语句
        let insertSql = `INSERT INTO posts (slug, title, feature, created, content, status, user_id, category_id)   VALUES ('${obj.slug}', '${obj.title}','${obj.feature}', '${obj.created}', '${obj.content}','${obj.status}','${obj.userId}','${obj.category}')`
        // console.log(insertSql)
        db.query(insertSql, (err, result) => {
            callback(err, result)
        })
    },
    getAllData: (obj,callback) => {
        // 执行sql语句： 
        let sql = ''
        sql +=`SELECT posts.*, users.nickname, categories.name FROM posts `
        sql +=`LEFT JOIN users ON posts.user_id = users.id  `
        sql +=`LEFT  JOIN  categories ON posts.category_id =categories.id WHERE 1 = 1 `
        let tiaojia = ``
        if (obj.category && obj.category != '0') {
            tiaojia += `and posts.category_id = ${obj.category} `
        } 
        if (obj.status && obj.status != '0' ) {
            tiaojia +=`and posts.status = '${obj.status}' `
        }
        sql +=tiaojia
        sql +=`ORDER BY id DESC `
        sql +=`LIMIT ${ (obj.page-1) * obj.pagesize }, ${obj.pagesize}; `
        sql +=`SELECT COUNT(*) FROM posts WHERE 1= 1 `
        sql +=tiaojia
        // console.log(obj)
        // console.log(sql)
        db.query(sql, (err, result) => {
            callback(err, result)
            // console.log(sql)
        }) 
    },
    postDataById: (id, callback) => {
        // 执行sql 语句
        let sql = `SELECT * FROM posts WHERE id = ${id}; `
        sql += `SELECT  * FROM  categories`
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    updataEdit: (obj, callback) => {
        // 执行sql语句
        let sql = `UPDATE posts SET title = '${obj.title}', slug ='${obj.slug}', category_id = ${obj.category}, created = '${obj.created}', status ='${obj.status}', content = '${obj.content}', feature =' ${obj.feature}'  WHERE id = ${obj.id} `
        // console.log(sql)
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}