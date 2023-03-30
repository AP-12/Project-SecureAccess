const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    FirstName:String,
    LastName :String,
    Username :String,
    Password :String, 
    Email :String,
    MobileNo:Number
});
module.exports=mongoose.model('login',ProductSchema);