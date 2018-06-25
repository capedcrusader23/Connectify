var express=require('express');
var route=express.Router();
var ques=require('../schema/ques.js');
var body=require('body-parser');
var ques=require('../schema/ques.js');
var url=body.urlencoded({extended:false});

var authen=function(req,res,next){

if(req.user)
{
  next();
}
else {
  res.redirect('/login')
}
}
route.get('/user',authen,url,function(req,res){
ques.find({}).then(function(ques){

  res.render('user',{user:req.user,ques:ques});

})
});


route.get('/question',function(req,res){
res.render('ques',{user:req.user});
});

route.get('/ans',url,function(req,res)
{
ques.find({}).then(function(ans){
res.render('ans',{ans:ans})
});

});
route.post('/postques',url,function(req,res){

new ques({
  ques:req.body.question,
  ask:req.user.name
}).save().then(function(){
  res.redirect('/user');
});
});

route.get('/ansques/:ques',url,function(req,res){
res.render('ansques',{ques:req.params.ques});
});
route.post('/correctans',function(req,res){
  new ques({
    ques:req.body.question,

  })
});

route.post('/ansdone',url,function(req,res){
  ques.findOne({ques:req.body.ques}).then(function(ans){
    ans.ans.push(req.body.ans);
});

})



module.exports=route;
