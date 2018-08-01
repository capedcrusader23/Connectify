var mongoose=require('mongoose');
var schema=mongoose.Schema;

var ans=new schema({
cont:{
  type:String
},
aid:{
  type:Number
},
upvote:{
  type:[Number]
},
downvote:{
  type:[Number]
},
per:{
  type:Number
},
name:{
  type:String
}
});
var ques=new schema({
ques:{
  type:String
},
qid:{
  type:Number
},
ask:{
  type:String
},
upvote:{
  type:[String]
},
downvote:{
  type:[String]
},
askedby:{
  type:Number
},
anser:{
  type:[ans]
}
});


var que=mongoose.model('ques',ques);

module.exports=que;
