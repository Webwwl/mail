const mongoose = require('mongoose')

let dbGood = mongoose.connect('mongodb://127.0.0.1:27017/mail',{useMongoClient:true})

let cartSchema = new mongoose.Schema({
  "productId" : Number,
  "productName" : String,
  "salePrice" : Number,
  "productImage" : String,
  "productUrl" : String
})

let goodModel = dbGood.model('goods',goodSchema,'goods')

exports.goodModel = goodModel
exports.dbGood = dbGood
