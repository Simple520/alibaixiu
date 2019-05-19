let db = require('./db.js')
module.exports = {
    query: db.query,
    // 用来获取所有的分类数据
    selectAll: function(callback) {
        let selSql = `SELECT * FROM categories`
        db.query(selSql, (err, result) => {
            callback(err, result)
        })
    },
    // 用来添加分类信息
    addData: function(postParamsObj,callback) {
        let insertSql = `INSERT INTO categories (slug, name) VALUES ('${postParamsObj.slug}', '${postParamsObj.name}')`
        db.query(insertSql, (err, result) => {
            callback(err, result)
        })
    },
    // 单个删除分类数据
    deleteById: function(id, callback) {
        let delSql = `DELETE FROM categories WHERE id=${id}`
        db.query(delSql, (err, result) => {
            callback(err,result)
        })
    },
    // 根据id获取与该条id相关所有的数据
    getInformationById: function(id, callback) {
        let selsql = `SELECT * FROM categories WHERE id = ${id}`
        db.query(selsql, (err, result) => {
            callback(err, result)
        })
    },
    // 修改用户信息后提交到数据库
    editUpdate: function(postParamsObj, callback) {
        let editSql = `UPDATE categories SET name = '${ postParamsObj.name }', slug = '${ postParamsObj.slug }' WHERE id = '${ postParamsObj.id }' `
        db.query(editSql, (err, result) => {
            callback(err, result)
        })
    },
    // 批量删除分类信息
    deleteByIds: function(ids, callback) {
        let delAllSql = `DELETE FROM categories WHERE id IN (${ids})`
        db.query(delAllSql, (err, result) => {
            callback(err, result)
        })
    }
}