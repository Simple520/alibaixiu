const db = require('./db.js')
module.exports = {
    getData: (callback) => {
        // 拼接sql
        let sql = `SELECT COUNT(*) FROM posts;` // 所有文章数目
        sql += `SELECT COUNT(*) FROM posts WHERE posts.status = 'drafted';` // 未审核的文章项目
        sql += `SELECT COUNT(*) FROM categories;` // 所有分类数目
        sql += `SELECT COUNT(*) FROM comments;` // 所有评论数
        sql += `SELECT COUNT(*) FROM comments WHERE comments.status = 'held'` // 待审核的评论，
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    }
}