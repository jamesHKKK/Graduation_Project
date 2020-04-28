//封装数据库的方法
// var mongoClient = require("mongodb").MongoClient
const {
    MongoClient
} = require("mongodb")
const {
    url
} = require("./setting/url")

function connectDB(callback)
 {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err
        var dbName = db.db("temp")
        callback(db, dbName)
    })
}

exports.part=function(collection,json,num,callback){
    connectDB((db, dbName) => {
        dbName.collection(collection).find(json).limit(6).skip(num).toArray((err, data) => { 
            callback(err,data)
            db.close()  
        })
    })
}
exports.add = function (collection, json, callback) {
    connectDB((db, dbName) => {
        dbName.collection(collection).insertOne(json, (err) => {
            callback(err)
            db.close()
        })
    })
}
exports.del = function (collection, json, callback) {
    connectDB((db, dbName) => {
        dbName.collection(collection).deleteOne(json, (err) => {
            callback(err)
            db.close()
        })
    })
}
exports.update = function (collection, json,json1, callback) {
    connectDB((db, dbName) => {
        dbName.collection(collection).update(json,json1, (err) => {
            callback(err)
            db.close()
        })
    })
}
exports.find = function (collection,json,callback) {
    
    connectDB((db, dbName) => {
        
        dbName.collection(collection).find(json).toArray((err, data) => { 
            callback(err,data)
            db.close()
            
        })
    })
}






