const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {

userName:{type:String,required:true},

email:{type:String,required:true,lowercase:true,validate:(val)=>{
    return validator.isEmail(val)
}},

mobile:{type:String,required:true},

password:{type:String,required:true},

role:{type:String,default:'user'},

cartItem:{type:Array,default:[]},

createdAt:{type:Date,default:Date.now}
    
}
)

module.exports = mongoose.model('users',userSchema);