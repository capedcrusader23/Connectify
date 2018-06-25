var mongoose=require('mongoose');
var schema=mongoose.Schema;

var user=new schema({
name:{
  type:String
},
email:{
  type:String
},
Eid:{
  type:Number
},
pass:{
  type:String
},
date:{
  dd:{
    type:Number
  },
  mm:{
    type:Number
  },
  yy:{
    type:Number
  }
}
});
user.methods.vaild=function(){
  return this.pass
};


var use=mongoose.model('user',user);
module.exports=use;
