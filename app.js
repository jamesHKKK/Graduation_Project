var express = require("express")
var path = require("path")
var app = express()
var bodyParser = require("body-parser")
var router = require("./router")
var cookieParser = require("cookie-parser")
var session = require("express-session")

app.use(cookieParser())
// 解决跨域
app.use(
    session({
        secret: "safe",
        name: "safe",
        cookie: {
            maxAge: 90000,
            httpOnly: true
        },
        resave: true,
        saveUninitialized: false
    })
)

//获取用户信息
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

//静态
var static = path.resolve(__dirname, "public")
app.use(express.static(static))
app.use(router)

app.listen(3000)