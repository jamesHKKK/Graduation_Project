# Graduation_Project
1.运行环境：<br>
window7及以上版本，安装node.js,安装mongodb数据库<br>
2.以管理员身份进入cmd  <br>
输入指令  mongo  进入数据库 <br>

开始创建数据库 ：<br>
use temp  <br> 
db.temp.insert({"name":"QianJiaji"})  <br>

创建集合：  <br>
use temp   <br>
db.createCollection("admin")   <br>
db.createCollection("case")  <br>
db.createCollection("dynamic")  <br>
db.createCollection("news")  <br>
db.createCollection("problem")  <br>
db.createCollection("user")  <br>

创建一个超级管理员账户：  <br>
db.admin.insert({"username":"admin","password":"123456"})  <br>

在project文件夹下执行命令  <br>
node app.js  启动成功  <br>

在浏览器上输入localhost:3000，进入本系统  <br>
  
