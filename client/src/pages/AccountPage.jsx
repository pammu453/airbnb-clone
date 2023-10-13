import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import Places from './Places';
import MyBookings from './MyBookings';

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const navigate = useNavigate();
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  useEffect(() => {
    
    if (!ready) {
      return;
    }

    if (!user && !redirect) {
      setRedirect("/login");
    }
  }, [ready, user, redirect, subpage]);

  const linkClass = (type = null) => {
    let classes = 'py-2 px-6 inline-flex gap-1 rounded-full m-1';
    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += " bg-gray-300";
    }
    return classes;
  };

  const logoutHandler = async () => {
    await axios.post("/user/logout");
    setRedirect("/");
    setUser(null);
  };

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect, navigate]);

  return (
    <div>
      <nav className='w-full md:flex justify-center mt-8 gap-2 mb-10'>
        <Link to={"/account"} className={linkClass("profile")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          My profile
        </Link>
        <Link to={"/account/bookings"} className={linkClass("bookings")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          My bookings</Link>
        <Link to={"/account/newPlace"} className={linkClass("newPlace")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Add places</Link>
        <Link to={"/account/places"} className={linkClass("places")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
          </svg>
          My accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} {user?.email} <br />
          <button className='primary max-w-sm mt-2' onClick={logoutHandler}>Logout</button>
        </div>
      )}
      {subpage === "newPlace" && <PlacesPage />}
      {subpage === "places" && <Places />}
      {subpage=== "bookings" && <MyBookings/>}
    </div>
  );
};

export default AccountPage;
