var express=require('express');
var app=express();
var route=require('./route/route.js')
var passpor=require('./config/pass.js')
var mongoose=require('mongoose');
var cookie=require('cookie-session');
var passport=require('passport');
var pro=require('./route/profile.js');
 var pars=require('cookie-parser');
const session = require('express-session');
var check=require('express-validator');
var pp2=require('./config/local.js');
var mul=require('multer');
var path=require('path')
app.use(express.static('views'))


app.use(cookie({
  maxAge:24*60*60*1000,
  keys:['CAPEDCRUSADER']
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://Uphaar:uphaar@ds131800.mlab.com:31800/connetify",function(){
  console.log("Connected");
});
app.set("view engine","ejs");
app.use(check());
app.use(route);
app.use(pro);







app.listen(1111,function(req,res){
console.log("Running");
});
