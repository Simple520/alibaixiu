// 控制器的职责： 处理逻辑 ， 获取数据， 响应数据
//分类模块的路由处理逻辑 
// 引入 userdb
const categorydb = require('../model/categorydb.js')
module.exports = {

    // 1.0 处理响应页面
    category: (req, res) => {
        // 将昵称渲染到页面中
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
        res.render('category', {nickname, avatar})
    },
    // 2.0 获取所有分类信息的处理逻辑
    getAllCategroies: (req, res) => {
        // categorydb.query(`SELECT * FROM categories`, (err, result) => {
        //     if (err) {
        //         res.send({
        //             status: 400,
        //             msg: '获取数据失败'
        //         })
        //     } else {
        //         res.send({
        //             status: 200,
        //             msg: '成功获取数据',
        //             data: result
        //         })
        //     }
        // })
        //得到所有分类数据：直接方法调用
        categorydb.selectAll((err, result) => {
            if (err) {
                return res.send({
                    status: 400,
                    msg: '获取数据失败'
                })
            }
            res.send({
                status: 200,
                msg: '成功获取数据',
                data: result
            })
        })

    },
    // 3.0 处理添加分类信息的逻辑
    addCategroies: (req, res) => {
        // 3.0.1 获取请求参数
        let params = req.body
        // 做一个表单验证：
        // if (params.slug == '' || params.name == '') {
        //     return res.send({
        //         status: 400,
        //         msg: '请把表单填写完整'
        //     })
        // }
        // categorydb.query(`INSERT INTO categories (slug, name) VALUES ('${params.slug}', '${params.name}')`, (err, result) => {
        //     if (err) {
        //         res.send({
        //             status: 400,
        //             msg: '添加失败，该类名已存在'
        //         }) 
        //     }else {
        //             res.send({
        //                 status: 200,
        //                 msg: '添加成功'
        //             })
        //         }
        //     }
        // )

        categorydb.addData(params,(err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '添加失败，该类名已存在'
                }) 
            }else {
                    res.send({
                        status: 200,
                        msg: '添加成功'
                    })
                }
            }
        )
    },

    // 4.0 处理单个删除分类路由的逻辑
    delById: (req,res) => {
        // 获取参数
        let id = req.query.id
        // console.log(id)

        // categorydb.query(`DELETE FROM categories WHERE id=${id}`, (err, result) => {
            // if (err) {
            //     res.send({
            //         status: 400,
            //         msg: '删除失败'
            //     })
            // } else {
            //     res.send({
            //         status: 200,
            //         msg: '删除成功'
            //     })
            // }
        // })
        categorydb.deleteById(id, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '删除失败'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '删除成功'
                })
            }
        })
    },
    // 5.0 获取单个id相关的所有信息
    getIDInfor: (req,res) => {
        //获取参数id
        let id = req.query.id
        // categorydb.query(`SELECT * FROM categories WHERE id = ${id}`, (err, result) => {
            // if (err) {
            //     res.send({
            //         status: 400,
            //         msg: '获取数据失败'
            //     })
            // } else {
            //     res.send({
            //         status: 200,
            //         msg: '成功获取数据',
            //         data: result[0]
            //     })
            // }
        // })
        categorydb.getInformationById(id, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '获取数据失败'
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
    // 6.0 处理修改分类信息后的提交路由
    ediCategytPost: (req,res) => {
        // 获取修改后提交的参数
        let params = req.body
        // console.log(params)
        // categorydb.query(`UPDATE categories SET name = '${ params.name }', slug = '${ params.slug }' WHERE id = '${ params.id }' `, (err, result) => {
        //     if (err) {
        //         res.send({
        //             status: 400,
        //             msg: '修改失败，该类名的别名已存在'
        //         })
        //     } else {
        //         res.send({
        //             status: 200,
        //             msg: '修改成功'
        //         })
        //     }
        // })
        categorydb.editUpdate(params, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '修改失败，该类名的别名已存在'
                })
            } else {
                res.send({
                    status: 200,
                    msg: '修改成功'
                })
            }
        })
    },
    // 7.0 处理批量删除的路由逻辑
    delCategories: (req,res) => {
        // 获取参数
        let params = req.body
        // console.log(params)
        // 获取的参数为 { id: [ '2', '3' ] }
        let idArr = params.id
        // 将数组转化为字符串
        let paramsStr = idArr.join(',')
        // categorydb.query(`DELETE FROM categories WHERE id IN (${paramsStr})`, (err, result) => {
            // if (err) {
            //     res.send({
            //         status: 400,
            //         msg: '批量删除失败'
            //     })
            // } else {
            //     res.send({
            //         status: 200,
            //         msg:'批量删除成功'
            //     })
            // }
        // })
        categorydb.deleteByIds(paramsStr, (err, result) => {
            if (err) {
                res.send({
                    status: 400,
                    msg: '批量删除失败'
                })
            } else {
                res.send({
                    status: 200,
                    msg:'批量删除成功'
                })
            }
        })
    }
}
