const db = require('./db.js')
module.exports = {
    // 得到所有的导航菜单数据
    getnavList: (callback) => {
        // 拼接sql语句
        let sql = `SELECT * FROM options WHERE options.key ='nav_menus'`
        // 执行sql语句
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    // 添加导航菜单栏
    addnavList: function (params, callback) {
        // 得到之前导航菜单的数据
        this.getnavList((err, result) => {
            if (err) {
                // 验证错误
                return callback(err, null)
            }
            // 添加一个对象，创建一个新的对象
            let obj = {
                icon: 'fa fa-fire',
                text: params.text,
                title: params.title,
                link: params.href
            }
            let dataStr = result[0].value
            // 将数据库中的数据转为对象
            let dataArr = JSON.parse(dataStr)
            // 放入数组
            dataArr.push(obj)
            // 将对象转为字符串
            let newStr = JSON.stringify(dataArr, null, '')
            // 更新到数据库中
            // 拼接sql语句
            let addSql = `UPDATE options SET options.value = '${newStr}' WHERE options.key ='nav_menus'`
            db.query(addSql, (err2, result2) => {
                // 执行
                callback(err2, result2)
            })
        })
    },
    // 获取轮播图数据
    getSlideData: (callback) => {
        // 拼接sql语句
        let sql = `SELECT * FROM options WHERE options.key = 'home_slides'`
        // 执行
        db.query(sql, (err, result) => {
            callback(err, result)
        })
    },
    // 添加轮播图
    addSlide: function (params, callback) {
        this.getSlideData((err, result) => {
            //   将数据转化为json对象
            let dataArr = JSON.parse(result[0].value)
            dataArr.push(params)
            // 将dataArr转化为jSON格式字符串
            let newData = JSON.stringify(dataArr, null, '')
            // 将数据更新到数据库中
            // 拼接sql语句
            let sql = `UPDATE options SET options.value = '${newData}' WHERE options.key = 'home_slides' `
            // 执行
            db.query(sql, (err2, result2) => {
                callback(err2, result2)
            })
        })
    },
    // 删除轮播图
    delByIndex: function (index, callback) {
        this.getSlideData((err, result) => {
            //   将数据转化为json对象
            let dataArr = JSON.parse(result[0].value)
            dataArr.splice(parseInt(index), 1)
            // 将dataArr转化为jSON格式字符串
            let newData = JSON.stringify(dataArr, null, '')
            // 将数据更新到数据库中
            // 拼接sql语句
            let sql = `UPDATE options SET options.value = '${newData}' WHERE options.key = 'home_slides' `
            // 执行
            db.query(sql, (err2, result2) => {
                callback(err2, result2)
            })
        })
    }
}