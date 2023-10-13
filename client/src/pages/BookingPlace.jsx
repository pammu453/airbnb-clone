import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext';
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BookingPlace = ({ place }) => {

    const { user } = useContext(UserContext);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [fullName, setFullName] = useState(user?.name);
    const [mobile, setMobile] = useState("");

    const navigate=useNavigate();

    let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async () => {
        const data = { checkIn, checkOut, numberOfGuests, fullName, mobile, place: place._id, price: numberOfNights * place.price }
        await axios.post("/bookPlaces/booking", data).then((reponse) => {
            const bookingId = reponse.data._id
            if (bookingId) {
                navigate("/account/bookings")
            } else {
                alert("Please provide details")
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl mt-4'>
            <div className='text-center text-1xl font-semibold'>
                Price : {place.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='py-3 px-3 mt-4 text-center block'>
                    <label>CheckIn</label> <br />
                    <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className='py-3 px-3 mt-4 text-center block'>
                    <label>CheckOut</label> <br />
                    <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='py-3 px-3 mt-4 text-center block'>
                    <label>Number of guests</label> <br />
                    <input type="number" value={numberOfGuests} min={1} className='bg-slate-100' onChange={e => setNumberOfGuests(e.target.value)} />
                </div>
                {
                    numberOfNights > 0 && (
                        <div className='py-3 px-3 text-center block'>
                            <label>Full name</label> <br />
                            <input type="text" value={fullName} min={1} className='bg-slate-100'/>
                            <label>Phone number</label> <br />
                            <input type="tel" value={mobile} min={1} className='bg-slate-100' onChange={e => setMobile(e.target.value)} />
                        </div>
                    )
                }
            </div>
            {
                user?.name ? (
                    <button className='primary mt-4' onClick={bookThisPlace}>
                        Book this place
                        {
                            numberOfNights > 0 && (
                                <span> ${numberOfNights * place.price}</span>
                            )
                        }
                    </button>
                ) : (
                    <button className='primary mt-4' disabled>
                        You need to login first for booking
                    </button>
                )
            }

        </div>
    )
}

export default BookingPlace
