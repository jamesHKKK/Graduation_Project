var express = require("express")
var form = require("formidable")
var fm = form.IncomingForm()
var path = require("path")
var fs = require("fs")
var sd = require("silly-datetime")
var router = express.Router()
var db = require("../db")
router.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "get,post,patch")
    next()
})
//注册管理员
router.post("/reg", (req, res) => {
    var picture = "static.webp"
    db.find("admin", {
        username: req.body.username
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {

                res.send({
                    status: 1,
                    msg: "已经注册"
                })
            } else if (data.length == 0) {
                var info = {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone,
                    sex: req.body.sex,
                    picture: picture,
                    createAt: new Date(),
                    updateAt: new Date(),
                    isDelete: 0
                }
                db.add("admin", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "注册成功"
                    })
                })
            }

        }
    })

})
//管理员登录
router.post("/login", (req, res) => {
    db.find("admin", {
        username: req.body.username
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未注册"
                })
            } else {
                if (data[0].username == req.body.username && data[0].password == req.body.password) {
                    res.cookie("username", req.body.username, {
                        maxAge: 90000,
                        httpOnly: true
                    })

                    res.send({
                        status: 0,
                        msg: "登录成功",


                    })
                } else {
                    res.send({
                        status: 2,
                        msg: "错误"
                    })
                }
            }
        }
    })
})
//管理员分页
router.post("/admin_separate", (req, res) => {
    var num = parseInt(req.body.num) * 6
    db.part("admin", {}, num, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//用户登录
router.post("/userlogin", (req, res) => {
    db.find("user", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未注册"
                })
            } else {
                if (data[0].num == req.body.num && data[0].password == req.body.password) {
                    res.cookie("num", req.body.num, {
                        maxAge: 999999999,
                        httpOnly: true
                    })
                    res.send({
                        status: 0,
                        name: data[0].username,
                        num:data[0].num,
                        msg: "登录成功",

                    })
                } else {
                    res.send({
                        status: 2,
                        msg: "错误"
                    })
                }
            }
        }
    })
})
//添加管理员
router.post("/admin_adduser", (req, res) => {
    db.find("admin", {
        username: req.body.username
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {
                res.send({
                    status: 1,
                    msg: "已经注册"
                })
            } else {
                var info = {
                    username: req.body.username,
                    password: req.body.password,
                    dec: req.body.dec
                }
                db.add("admin", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "添加成功"
                    })
                })
            }

        }
    })
})
//删除管理员
router.post("/admin_delete", (req, res) => {
    db.del("admin", {
        username: req.body.username
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
// 更新管理员
router.post("/admin_update", (req, res) => {
    db.update("admin", {
        username: req.body.username
    }, {
        $set: {
            password: req.body.password
        }
    }, (err) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                msg: "修改成功"
            })

        }
    })
})
//反馈分页
router.post("/fan_separate", (req, res) => {
    var num = parseInt(req.body.num) * 6
    db.part("problem", {}, num, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//注册用户
router.post("/adduser", (req, res) => {
    db.find("user", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {
                res.send({
                    status: 1,
                    msg: "已经注册"
                })
            } else {
                var info = {
                    num: req.body.num,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    createAt: new Date(),
                    updateAt: new Date(),
                    isDelete: 0
                }
                db.add("user", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "注册成功"
                    })
                })
            }

        }
    })
})
//退出登录
router.post("/quit", (req, res) => {
    res.clearCookie("num")
    res.send({
        status: 0
    })

})
//问题反馈
router.post("/problem", (req, res) => {
    db.find("problem", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length != 0) {
            data[0].problem.push(req.body.problem)
                db.update("problem", {
                    num: req.body.num
                }, {
                    $set: {
                        problem: data[0].problem
                    }
                }, (err) => {
                    if (err) throw err
                    else {
                        res.send({
                            status: 1,
                            msg: "修改成功"
                        })
                    }
                })
            } else {
                var info = {
                    num: req.body.num,
                    username: req.body.username,
                    email: req.body.email,
                    createAt: new Date(),
                    updateAt: new Date(),
                    problem: []
                }
                info.problem.push(req.body.problem)
                db.add("problem", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "添加成功"
                    })
                })
            }

        }
    })
})
//删除问题
router.post("/problem_delete", (req, res) => {
    db.del("problem", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
//判断登录状态接口
router.post("/just", (req, res) => {
    if (req.cookies.num) {
        res.send({
            status: 0
        })
    } else {
        res.send({
            status: 1
        })
    }
})
//分页
router.post("/separate", (req, res) => {
    var num = parseInt(req.body.num) * 6
    db.part("user", {}, num, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//获取详用户信息
router.post("/getUserinfo", (req, res) => {
    db.find("user", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            if (data[0].num == req.body.num) {
                res.send({
                    status: 0,
                    data: data[0],
                    msg: "获取成功",
                })
            } else {
                res.send({
                    status: 2,
                    msg: "错误"
                })
            }
        }
    })
})
//查询全部
router.post("/findall", (req, res) => {

    db.find("user", {}, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })
})
//查询
router.post("/search", (req, res) => {
    db.find("user", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未查询到该用户"
                })
            } else {
                if (data[0].num == req.body.num) {
                    res.send({
                        status: 0,
                        msg: "查询成功",
                        data: data
                    })
                } else {
                    res.send({
                        status: 2,
                        msg: "错误"
                    })
                }
            }
        }
    })
})
//修改用户信息
router.post("/update", (req, res) => {
    db.update("user", {
        num: req.body.num
    }, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
    }, (err) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                msg: "修改成功"
            })
        }
    })
})
router.post("/delete", (req, res) => {
    db.del("user", {
        num: req.body.num
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
// 添加动态
router.post("/dynamic", (req, res) => {
    function genID(length){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    }
                var info = {
                    num:req.body.num,
                    name:req.body.name,
                    title:req.body.title,
                    text:req.body.text,
                    createAt: new Date(),
                    updateAt: new Date(),
                    isDelete: 0,
                    id:genID(4)
                }
                db.add("dynamic", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "添加成功"
                    })
                })
})
//分页我的动态
router.post("/dy_separate", (req, res) => {
    var f_num = parseInt(req.body.f_num) * 6
    db.part("dynamic", {
        num:req.body.num
    }, f_num, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//分页全部动态
router.post("/all_separate", (req, res) => {
    var num = parseInt(req.body.num) * 6
    db.part("dynamic", {}, num, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
// 删除我的动态
router.post("/dy_delete", (req, res) => {
    db.del("dynamic", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
//查询我的动态
router.post("/dy_search", (req, res) => {
    db.find("dynamic", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未查询到该用户"
                })
            } else {
                    res.send({
                        status: 0,
                        msg: "查询成功",
                        data: data[0]
                    })
            }
        }
    })
})
//添加新闻
router.post("/add_news", (req, res) => {
    function genID(length){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    }
                var info = {
                    title:req.body.title,
                    content:req.body.content,
                    createAt: new Date(),
                    updateAt: new Date(),
                    id:genID(4)
                }
                db.add("news", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "添加成功"
                    })
                })
})
// 新闻分页
router.post("/news_separate", (req, res) => {
    var news = parseInt(req.body.news) * 6
    db.part("news", {}, news, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//查询新闻
router.post("/news_search", (req, res) => {
    db.find("news", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未查询到该用户"
                })
            } else {
                    res.send({
                        status: 0,
                        msg: "查询成功",
                        data: data[0]
                    })
            }
        }
    })
})
// 删除新闻
router.post("/news_delete", (req, res) => {
    db.del("news", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
//添加案例
router.post("/add_case", (req, res) => {
    function genID(length){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    }
                var info = {
                    title:req.body.title,
                    content:req.body.content,
                    createAt: new Date(),
                    updateAt: new Date(),
                    id:genID(4)
                }
                db.add("case", info, (err) => {
                    if (err) throw err
                    res.send({
                        status: 0,
                        msc: "添加成功"
                    })
                })
})
// 案例分页
router.post("/case_separate", (req, res) => {
    var news = parseInt(req.body.case) * 6
    db.part("case", {}, news, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0,
                data: data
            })
        }
    })

})
//查询案例
router.post("/case_search", (req, res) => {
    db.find("case", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            if (data.length == 0) {
                res.send({
                    status: 1,
                    msg: "未查询到该用户"
                })
            } else {
                    res.send({
                        status: 0,
                        msg: "查询成功",
                        data: data[0]
                    })
            }
        }
    })
})
// 删除案例
router.post("/case_delete", (req, res) => {
    db.del("case", {
        id: req.body.id
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                status: 0
            })
        }
    })
})
module.exports = router