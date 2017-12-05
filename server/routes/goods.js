var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var urlLib = require('url')
var {goodModel,dbGood} = require('../model/goodsModel')
/* GET users listing. */
router.get('/', function(req, res, next) {
  let options = urlLib.parse(req.url,true).query
  console.log(options)

  goodModel.find({},null,{sort:{salePrice:-1}},(err,data) => {
    if(err)
      console.log(err)
    else{
      res.send(data)
    }
    res.end()
    // dbGood.close()
  })
});

//fot test
router.get('/test', (req,res) => {
  res.send('hello').end()
})

module.exports = router
