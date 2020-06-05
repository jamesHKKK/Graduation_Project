var express = require("express")
var path = require("path")
var app = express()
var bodyParser = require("body-parser")
var router = require("./router")
var cookieParser = require("cookie-parser")
var session = require("express-session")

var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var users = [];
// server.listen();
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
io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        };
    });
    //user leaves
    socket.on('disconnect', function() {
        if (socket.nickname != null) {
            //users.splice(socket.userIndex, 1);
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});

//静态
var static = path.resolve(__dirname, "public")
app.use(express.static(static))

app.use(router)

server.listen(3000)