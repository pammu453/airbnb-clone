const Booking=require("../models/Booking.js")

const booking=async(req,res)=>{
  try {
    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      fullName,
      mobile,
      price
    }=req.body

    const book = await new Booking({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      fullName,
      mobile,
      price
    })  
    const bookedPlace = await book.save()
    res.status(200).json(bookedPlace);
  } catch (error) {
    res.json(error.message)
  }
  }

const myBookings=async(req,res)=>{
  const {name}=req.params;
  const myBooking=await Booking.find({fullName:name}).populate("place")
  res.json(myBooking)
}

const deleteBookings=async(req,res)=>{
  const {id}=req.params;
  await Booking.findByIdAndDelete({_id:id})
  res.json("Deleted")
}

module.exports={booking,myBookings,deleteBookings}



