const mongoose = require('mongoose');

const placeShema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:String,
    address:String,
    addedPhotos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkInTime:Number,
    checkOutTime:Number,
    maxGuests:Number,
    price:Number
})

const Place=mongoose.model("Place",placeShema);

module.exports=Place;
