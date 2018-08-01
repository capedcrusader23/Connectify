var express=require('express');
var route=express.Router();
var ques=require('../schema/ques.js');
var body=require('body-parser');
var ques=require('../schema/ques.js');
var user=require('../schema/schema.js');
var url=body.urlencoded({extended:false});
var multer=require('multer');
var path=require('path');
var jsonParser = body.json()


var authen=function(req,res,next){

if(req.user)
{
  console.log('come here');
  next();
}
else {
  res.redirect('/login')
}
}

route.get('/user',authen,url,function(req,res){

  res.redirect('/users/'+req.user.Eid);

});

route.get('/users/:id',authen,url,function(req,res){
user.findOne({Eid:req.params.id}).then(function(use){
ques.find({askedby:req.params.id}).then(function(que){

res.render('user',{user:use,ques:que,sign:req.user})

})
})

})

var storage=multer.diskStorage({
  destination:'./upload',
  filename:function(req,file,cb){
    cb(null,file.fieldname +'-'+Date.now()+path.extname(file.originalname));
  }
});
const upload=multer({
  storage:storage,
  limits:{fileSize:10000000},
  fileFilter:function(req,file,cb){
    const ft=/jpg|jpeg|png|gif/;
    const extname=ft.test(file.fieldname +'-'+Date.now()+path.extname(file.originalname).toLowerCase());
    const mim=ft.test(file.mimetype);
    if(extname&&mim)
    {
      return cb(null,true);
    }
    else {
      return cb('Error',false);
    }
  }
}).single('img');


route.get('/question/:Eid',function(req,res){
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
  ask:req.user.name,
  qid:Math.floor(Math.random()*10000000),
askedby:req.user.Eid,
    upvotes:[],
    downvote:[],
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

ques.findOne({ques:req.body.ques}).then(function(que){
console.log(que)
 que.anser.push({upvote:[],downvote:[],cont:req.body.ans,aid:Math.floor(Math.random()*1000000),per:req.user.Eid,name:req.user.name})
  que.save();

})
})

route.post('/postimg',function(req,res){
user.findOne({_id:req.user._id}).then(function(use){
  upload(req,res,function(err){
    if(err)
    {
      res.render('log',{msg:err});
    }
    else {
  use.img=req.file.path;
  use.save();
    }
  });




});


});


route.post('/doupvote',jsonParser,function(req,res){
ques.findOne({qid:req.body.project}).then(function(data){
  var p=0;
  var check=0;
  var comm='';


  for(q=0;q<data.downvote.length;q++)
  {
    if(req.body.client==data.downvote[q])
    {
      check=1;
      break;

    }
  }
  if(check==1)
  {
    comm="cannot do upvote and downvote";
      res.send({data,comm})
  }
  else
  {
    for(q=0;q<data.upvote.length;q++)
    {
       if (req.body.client == data.upvote[q]) {
          p = 1;
          data.upvote.pop(req.body.client);
          data.save();
          console.log("already present");
          break;

    }
  }

  if(p==0)
  { data.upvote.push(req.body.client);
      data.save();
  }
res.send({comm,data});
}

});
})


route.post('/dodownvote',jsonParser,function(req,res){
    ques.findOne({qid:req.body.project}).then(function(data){
        var p=0;
        var check=0;
        var comm='';


        for(q=0;q<data.upvote.length;q++)
        {
            if(req.body.client==data.upvote[q])
            {
                check=1;
                break;

            }
        }
        if(check==1)
        {
            comm="cannot do upvote and downvote";
            res.send({data,comm})
        }
        else
        {
            for(q=0;q<data.downvote.length;q++)
            {
                if (req.body.client == data.downvote[q]) {
                    p = 1;
                    data.downvote.pop(req.body.client);
                    data.save();
                    console.log("already present");
                    break;

                }
            }

            if(p==0)
            { data.downvote.push(req.body.client);
                data.save();
            }
            res.send({comm,data});
        }

    });
})








module.exports=route;
