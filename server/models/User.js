const mongoose = require('mongoose');

const userShema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

const User=mongoose.model("User",userShema);

module.exports=User;
