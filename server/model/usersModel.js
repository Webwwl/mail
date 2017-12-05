const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://127.0.0.1:27017/mail',{useMongoClient:true})

let userSchema = new mongoose.Schema({
  "userId":Number,
  "userName":String,
  "userPwd":Number,
  "orderList":Array,
  "cartList":Array,
  "addressList":Array
})

let userModel = db.model('users',userSchema,'users')

exports.userModel = userModel
exports.db = db
