const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
      },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    price: { type: Number, required: true },
})

const Booking=mongoose.model("Booking",bookingSchema)

module.exports=Booking
