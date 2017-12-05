
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

var Cat = mongoose.model('users', {name:String,age:Number });

Cat.find({age:{$gt:10}},{age:1},{limit:5,skip:2},(err,log) => {
  if(err)
    console.log(err)
  else {
    console.log(log)
  }
  db.close()
})



