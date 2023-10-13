const express = require('express');
const  {booking,myBookings,deleteBookings} = require("../controles/booking.js");

const router = express.Router();

router.post('/booking', booking);
router.get('/myBooking/:name', myBookings);
router.delete('/deleteBooking/:id', deleteBookings);

module.exports =  router ;
