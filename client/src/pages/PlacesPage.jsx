import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import PerkPage from './PerkPage';
import axios from 'axios';

const PlacesPage = () => {

    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get("/place/places/" + id).then(response => {
            const { data } = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.addedPhotos)
            setDescription(data.description)
            setExtraInfo(data.extraInfo)
            setPerks(data.perks)
            setCheckInTime(data.checkInTime)
            setCheckOutTime(data.checkOutTime)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    const [redirect, setRedirect] = useState("")

    function inputHeader(text) {
        return <h2 className='text-xl mt-4'>{text}</h2>
    }

    function inputDecription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDecription(description)}
            </>
        )
    }

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: fileName } = await axios.post("/place/upload-by-link", { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, fileName]
        })
        setPhotoLink('');
    }

    async function upload(e) {
        const files = e.target.files
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i])
        }
        axios.post("/place/upload", data, {
            headers: { "Content-type": "multipart/form-data" }
        }).then((res) => {
            const { data: fileName } = res
            setAddedPhotos(prev => {
                return [...prev, ...fileName]
            })
        })
    }

    async function savePlace(e) {
        e.preventDefault();
        const placedata = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkInTime,
            checkOutTime,
            maxGuests,
            price
        }
        if (id) {
            await axios.put(`/place/places/${id}`, placedata)
        } else {
            await axios.post("/place/places", placedata)
        }
        setRedirect("/account/places")
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    const deleteImage = (link) => {
        setAddedPhotos(addedPhotos.filter(photo => photo !== link))
    }

    const makeMainPhoto = (link) => {
        setAddedPhotos([link, ...addedPhotos.filter(photo => photo !== link)])
    }

    return (
        <div className='text-center'>
            <div className='text-left'>
                <form onSubmit={savePlace}>
                    {preInput("Title", "Title for your data,should be short and catchy")}
                    <input type="text" placeholder='title for example : My lovely apartment' value={title} onChange={e => setTitle(e.target.value)} />
                    {preInput("Address", "Address to this place")}
                    <input type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
                    {preInput("Photos", "more = better")}
                    <div className='flex gap-4'>
                        <input type="text" placeholder='Add using a link ....jpg' value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                        <button className='bg-gray-200 px-4 rounded-2xl' onClick={addPhotoByLink}> Add&nbsp;photo</button>
                    </div>
                    <div className='grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2 '>
                        {
                            addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link} className='relative'>
                                    <img className='rounded-xl h-32 m-auto w-full object-cover' src={`http://localhost:5000/uploads/${link}`} alt="" />
                                    <svg onClick={() => deleteImage(link)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-0 left-2 text-red-600 cursor-pointer hover:bg-slate-700 rounded-full" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <div onClick={() => makeMainPhoto(link)}>
                                        {
                                            link === addedPhotos[0] ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute top-24 left-0 ml-2 text-pink-600 cursor-pointer hover:bg-slate-700 rounded-full">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-24 left-0 ml-2 text-pink-600 cursor-pointer hover:bg-slate-700 rounded-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <label className='cursor-pointer flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                            <input type="file" multiple hidden onChange={upload} />
                            Upload
                        </label>
                    </div>
                    {preInput("Description", "description of the place")}
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    {preInput("Perks", "select all the perks of you places")}
                    <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2'>
                        <PerkPage selected={perks} onChange={setPerks} />
                    </div>
                    {preInput("Extra info", "house rules, etc")}
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                    <h2 className='text-xl mt-4 mb-2'>Check in & out time</h2>
                    <div className="grid sm:grid-cols-3 gap-2">
                        <div>
                            <h3>Check in time</h3>
                            <input type="text" placeholder='14:00' value={checkInTime} onChange={e => setCheckInTime(e.target.value)} />
                        </div>
                        <div>
                            <h3>Check out time</h3>
                            <input type="text" placeholder='14:00' value={checkOutTime} onChange={e => setCheckOutTime(e.target.value)} />
                        </div>
                        <div>
                            <h3>Max number of guests</h3>
                            <input type="number" min="1" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                        </div>
                        <div>
                            <h3>Price</h3>
                            <input type="number" min="1" value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        {
                            id ? (
                                <button className='primary my-4'>Update</button>
                            ) : (
                                <button className='primary my-4'>Save</button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlacesPage
