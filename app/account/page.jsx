'use client'
import { useEffect, useState, useContext , Fragment} from 'react';
import { useRouter } from 'next/navigation';
import BookingTab from '@/components/BookingTab';
import Loading from '@/components/Loading';
// import { AuthContext } from '@/components/AuthContext';
import { Tab } from '@headlessui/react'
import Payment from '@/components/Payment';
const Profile = () => {
  const [userProfileInfo , setUserProfileInfo] = useState([]);
  const [bookings , setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState([])
  
const custURL = `${process.env.NEXT_PUBLIC_API_URL}/Customer/`;
const bokkingURL = `${process.env.NEXT_PUBLIC_API_URL}/Customer-Booking-Details/`;

useEffect(() => {
  const fetchData = async () => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      // Redirect to the homepage if there is no token
      // setToken(null);
      // setUserInfo(null);
      // Clear user data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push('/');
      return;
    }

    try {
      // Fetch user profile data
      setLoading(true)

      const responseProfile = await fetch(custURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!responseProfile.ok) {
        throw new Error('Error fetching user profile data');
      }

      const userData = await responseProfile.json();
      setUserProfileInfo(userData[0]);

      // Check if there is user data before fetching bookings
      if (userData.length > 0) {
        // Fetch booking details
        const responseBooking = await fetch(bokkingURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseBooking.ok) {
          throw new Error('Error fetching booking details');
        }

        const bookingData = await responseBooking.json();
       
        setBookings(bookingData.reverse());
        console.log('bookingData 121', bookingData)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      router.push('/');
    }
  };

  fetchData();
}, [bokkingURL]);

// let categories = ['Bookings','Profile']
  return (
    <>
    {/* {loading ? <Loading /> : ( */}
      <div className="container mx-auto md:py-3">
      <div className="bg-gradient-to-r from-bgleft to-Orange text-center py-20 -mb-10">
        <h2 className="text-3xl font-bold text-white">Account</h2>
      </div>
      <BookingTab bookings={bookings} userProfileInfo={userProfileInfo} />
    </div>
    {/* ) } */}
    
    </>
  );
};

export default Profile;
