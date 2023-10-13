import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingPlace from './BookingPlace';

const PagePlace = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllphotos, setShowAllphotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get(`/place/${id}`)
                .then(reponse => {
                    setPlace(reponse.data)
                })
        }
    }, [id])

    if (!place) return "";

    if (showAllphotos) {
        return (
            <div className='mt-2 bg-white min-h-screen min-w-full '>
                <div className='container mx-auto p-4'>
                    <div class="flex justify-start">
                        <button onClick={() => setShowAllphotos(false)} class="flex p-2 float-left bg-gray-700 text-white rounded-full fixed shadow shadow-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {place.addedPhotos &&
                            place.addedPhotos.length > 0 &&
                            place.addedPhotos.map((photo, index) => (
                                <div key={index} className='bg-gray-100 p-4 rounded-md shadow shadow-black'>
                                    <img
                                        className='w-full h-auto rounded-md mt-8 hover:scale-110 transition duration-500'
                                        src={`http://localhost:5000/uploads/${photo}`}
                                        alt={`Photo ${index + 1}`}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-8 bg-gray-100 p-4 sm:px-8 sm:py-8'>
            <h1 className='text-2xl'>{place.title}</h1>
            <a target='_blank' className='flex font-semibold underline my-2' href={`https://www.google.co.in/maps/search/${place.address}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
            </a>
            <div className="relative">
                <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden md:h-96'>
                    <div>
                        {
                            place.addedPhotos?.[0] && (
                                <div>
                                    <img className='aspect-square object-cover w-full' src={"http://localhost:5000/uploads/" + place.addedPhotos[0]} alt="" />
                                </div>
                            )
                        }
                    </div>
                    <div className='grid'>
                        {
                            place.addedPhotos?.[1] && (
                                <img className='aspect-square object-cover  w-full md:h-full' src={"http://localhost:5000/uploads/" + place.addedPhotos[1]} alt="" />
                            )
                        }
                        <div className='md:hidden'>
                            {
                                place.addedPhotos?.[2] && (
                                    <img className='aspect-square object-cover  w-full' src={"http://localhost:5000/uploads/" + place.addedPhotos[2]} alt="" />
                                )
                            }
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllphotos(true)} className='absolute bg-gray-700 bottom-0 rounded-full text-white right-0 py-2 px-1 m-2  flex gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div className='p-2'>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check-in : {place.checkInTime} <br />
                    Check-out : {place.checkOutTime} <br />
                    Max number of quests : {place.maxGuests}
                    <div>
                        <h2 className='font-semibold text-2xl my-2'>Extra Info about our place</h2>
                        {place.extraInfo}
                    </div>
                </div>
                <BookingPlace place={place} />
            </div>
        </div>
    )
}

export default PagePlace
