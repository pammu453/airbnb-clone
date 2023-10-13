import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Places = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    try {
      axios.get("/place/myPlaces").then(({ data }) => {
        setPlaces(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deletePlace = async (id) => {
    axios.delete(`/place/deleteMyPlaces/${id}`).then(() => {
      setPlaces(places.filter((place) => place._id !== id));
    });
  }

  return (
    <div className="mt-4">
      {places.length > 0 ? (
        places.map((place) => (
          <div

            key={place._id}
            className="flex cursor-pointer flex-col md:flex-row gap-4 bg-gray-200 p-4 rounded-2xl mb-2"
          >
            <div className="md:w-32 md:h-32 bg-gray-300 grow shrink-0">
              {place.addedPhotos.length > 0 && (
                <img
                  className="object-cover md:h-32 w-full"
                  src={`http://localhost:5000/uploads/${place.addedPhotos[0]}`}
                  alt="not found"
                />
              )}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
            <div className='flex gap-2'>
              <Link to={`/account/newPlace/${place._id}`}>
                <button className='rounded-xl p-2 h-full bg-blue-300'>Update</button>
              </Link>
              <div>
                <button className='myColor rounded-xl p-2 h-full bg-blue-300' onClick={() => deletePlace(place._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-2xl">No accommodations</h1>
      )}
    </div>
  );
};

export default Places;
