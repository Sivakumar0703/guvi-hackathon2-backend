
const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({


cartItems : {
    type:Array,
    required:true
},

userName : {
    type:String,
    required:true
},

email:{
    type:String,
    required:true
},


totalAmount : {
    type:Number,
    required:true
},

orderId : {
    type:String,
    required:true 
},

createdOn: {
    type: Date,
    default: Date.now()
},


})

module.exports = mongoose.model('payments' , paymentSchema);