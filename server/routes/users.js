var express = require('express');
var router = express.Router();
var urlLib = require('url')
var {userModel,db} = require('../model/usersModel')
/* GET users listing. */
router.post('/login', function(req, res, next) {
  let params = {
    userName:req.body.userName,
    userPwd:parseInt(req.body.userPwd)
  }
  userModel.findOne(params, (err,doc) => {
    if(err){
      res.send({
        status:1,
        msg:err.message
      })
    }
    else{
      if(!doc)
        res.send({
          status:1,
          msg:'pwd wrong'
        })
      else{
        res.cookie('userId',doc.userId,{
          path:'/',
          maxAge:1000*60*60
        })
        res.send({
          status:0,
          msg:'login success',
          userName:doc.userName,
          userId:doc.userId,
          cartCount:doc.cartList.length
        })
      }
    }
    //db.close()
    res.end()
  })
});

//loginout
router.post('/loginOut',(req,res) => {
   res.cookie('userId','',{
     path:'/',
     maxAge:-1
   })
  res.send({
    status:0,
    msg:'登出'
  })
})
//get cartList
router.get('/cart',(req,res) => {
  let userName = urlLib.parse(req.url,true).query.userName
  userModel.findOne({userName:userName},(err,doc) => {
    if(err){
      res.send({
        status:1,
        msg:err.message
      })
    }else{
      res.send({
        status:0,
        cartList:doc.cartList
      })
    }
    res.end()
  })
})
//add to cartList
router.post('/addCart',(req,res) => {
  let item = req.body.item
  let productName = item.productName
  let userName = req.body.userName
  userModel.findOne({'cartList.productName':productName,'userName':userName},{'cartList.$':1},(err,doc) => {
    if(err)
      res.send({
        status:1,
        msg:err.message
      }).end()
    else{
      if(!doc){
        userModel.update({'userName':userName},{$push:{'cartList':item}},(err,doc) => {
          if(err)
            res.send({
              status:1,
              msg:'push fail'
            }).end()
          else{
            userModel.findOne({'userName':userName},(err,doc) => {
              res.send({
                status:0,
                msg:'push success',
                cartCount:doc.cartList.length
              }).end()
            })
          }
        })
      }else{
        let newNum = (+doc.cartList[0].productNum+1).toString()
        userModel.update({'cartList.productName':productName,'userName':userName},{$set:{'cartList.$.productNum':newNum}},(err,doc) => {
          if(err){
            res.send({
              status:1,
              msg:err.message
            }).end()
          }else{
            res.send({
              status:0,
              msg:'update success'
            }).end()
          }
        })
      }
    }
  })
})
module.exports = router;

// delete item from cartListi

router.post('/removeCart',(req,res) => {
  let userName = req.body.userName
  let item = req.body.item
  let productName = item.productName
  userModel.update({'userName':userName},{$pull:{'cartList':{'productName':productName}}},(err,doc) => {
    if(err)
      res.send({
        status:1,
        msg:err.message
      }).end()
    else{
      userModel.findOne({'userName':userName},(err,doc) => {
        res.send({
          status:0,
          msg:'remove success',
          cartCount:doc.cartList.length
        }).end()
      })
    }
  })
})

// get addressList
router.get('/address', (req,res) => {
  let userName = urlLib.parse(req.url,true).query.userName
  userModel.findOne({'userName':userName},{'addressList':1}, (err,doc) => {
    if(err)
      res.send({
        status:1,
        msg:err.message
      }).end()
    else if(!doc) {
      res.send({
        status: 1,
        msg: 'not find'
      }).end()
    }
      else{
        res.send({
          status:0,
          msg:'find success',
          addressList:doc.addressList
        }).end()
      }
  })
})

//finish pay
router.post('/pay',(req,res) => {
  let order = req.body.order
  let userName = req.body.userName
  userModel.update({'userName': userName}, {$push: {'orderList': order}}, (err, doc) => {
    if (err) {
      res.send({
        status: 1,
        msg: err.message
      }).end()
    }
    else if (doc) {
      res.send({
        status: 0,
        msg: 'add order success'
      }).end()
    }
  })
})
