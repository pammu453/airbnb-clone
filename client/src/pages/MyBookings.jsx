import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../UserContext';

const MyBookings = () => {
    const { user } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.name) {
            axios.get(`/bookPlaces/myBooking/${user.name}`)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [user?.name]);

    const deleteBookedPlace=(id)=>{
        const isTrue= confirm("Are you really want to cancel booking?")
        if(isTrue){
            axios.delete(`/bookPlaces/deleteBooking/${id}`)
            .then(response => {
                setBookings(bookings.filter(booking => booking._id !== id))
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-4 text-center ">My Bookings</h1>
            {
                bookings.length > 0 ? (<div className="p-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookings.map((book) => (
                            <div key={book._id} className="bg-gray-100  rounded-lg p-4 shadow-md hover:bg-slate-200">
                                <div className="mb-4">
                                    <h1 className="text-2xl font-semibold">{book.fullName}</h1>
                                </div>
                                <div className="mb-4">
                                    <h2 className="font-semibold">Booked Place : {book.place.title}</h2>
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-500">Mobile: {book.mobile}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600">Price: ${book.price}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600">Check-in: {book.checkIn}</p>
                                    <p className="text-gray-600">Check-out: {book.checkOut}</p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-600">Number of Guests: {book.numberOfGuests}</p>
                                </div>
                                <div>
                                    <button className='primary' onClick={()=>deleteBookedPlace(book._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>) : (
                    <div className='text-center'>
                        <h1 className=' text-2xl'>U don't have bookings right now</h1>
                    </div>
                )
            }
        </div>

    )
}

export default MyBookings
