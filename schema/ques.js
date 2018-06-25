var mongoose=require('mongoose');
var schema=mongoose.Schema;


var ques=new schema({
ques:{
  type:String
},
ans:[{type:String}],
ask:{
  type:String
}
});


var que=mongoose.model('ques',ques);

module.exports=que;
