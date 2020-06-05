# Graduation_Project
1.运行环境：
window7及以上版本，安装node.js,安装mongodb数据库
2.以管理员身份进入cmd
输入指令  mongo  进入数据库

开始创建数据库 ：
use temp
db.temp.insert({"name":"QianJiaji"})

创建集合：
use temp
db.createCollection("admin")
db.createCollection("case")
db.createCollection("dynamic")
db.createCollection("news")
db.createCollection("problem")
db.createCollection("user")

创建一个超级管理员账户：
db.admin.insert({"username":"admin","password":"123456"})

在project文件夹下执行命令
node app.js  启动成功

在浏览器上输入localhost:3000，进入本系统
  
