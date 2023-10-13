import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/place/allPlaces").then((response) => {
      setPlaces([...response.data])
    })
  }, [])

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} key={place._id}>
          <div className="w-200" >
            {place.addedPhotos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square m-auto" src={"http://localhost:5000/uploads/" + place.addedPhotos?.[0]} alt="" />
            )}
            <div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}