# Graduation_Project
运行环境node.js,数据库mongodb <br>
首先得先安装运行环境node和数据库mongodb
# Database configuration
# 1.创建数据库
use temp<br>
db.temp.insert({"name":"QianJiaji"})
# 2.创建集合
use temp
db.createCollection("admin")<br>
db.createCollection("case")<br>
db.createCollection("dynamic")<br>
db.createCollection("news")<br>
db.createCollection("problem")<br>
db.createCollection("user")
# clone the project
git clone https://github.com/jamesHKKK/Graduation_Project.git

# enter the project directory
cd Graduation_Project

# install dependency
npm install

# develop
node app.js