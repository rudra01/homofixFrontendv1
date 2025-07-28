'use client'
import { Dialog } from '@headlessui/react';
// import crypto from 'crypto';
import { useState, useEffect, useCallback } from 'react';
import CongBooking from './CongBooking';
// import Razorpay  from 'react-razorpay';
// import Razorpay from 'react-razorpay';
import dayjs from 'dayjs';
import crypto from "crypto"
import { XMarkIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

// import Easebuzz from "./Easebuzz";

const Booking = ({ cnames, title , cartItems , customer , couponID , PaymentAmount}) => {
  const [minDateTime, setMinDateTime] = useState('');
  const [bookingShow, setBookingShow] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [name , setName] = useState('')
  const [add , setAdd] = useState('')
  const [area , setArea] = useState('')
  const [city , setCity] = useState('')
  const [state , setState] = useState('')
  const [zip , setZip] = useState('')
  const [gstNo, setGstNo] = useState('')
  const [gstError, setGstError] = useState('')

  const [paymentMethod , setPaymentMethod] = useState('Online')
  const [userProfileInfo , setUserProfileInfo] = useState({})
  const [bookingID , setBookingID] = useState(null)
  const [isBookingCompleted, setBookingCompleted] = useState(false);
  const [congBookingShow, setCongBookingShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [easebuzzkey , easebuzzsalt] = ['WJE5UAJ51D', 'Y3LVJ15S3M'];
  const [errormsg, setErrorMsg] = useState('');
  const [errormsgadd, setErrorMsgAdd] = useState('');
  const [errormsgadrea, setErrorMsgArea] = useState('');
  const [errormsgName, setErrorMsgName] = useState('');
  const [originalCity, setOriginalCity] = useState('');
  const [dfVal, setDfval] = useState('');
  const nineAM = dayjs().set('hour', 9).startOf('hour');
  const eightPM = dayjs().set('hour', 20).startOf('hour');
  const shouldDisableTime= ()=>{(value, view) =>
    view === 'hours' && value.hour() > 9 && value.hour() < 20
  }
  const currentworkingcities = ['Central Delhi', 'Delhi', 'New Delhi', 'North West Delhi', 'North Delhi', 'North East Delhi', 'East Delhi', 'West Delhi', 'South West Delhi', 'South Delhi', 'Old Delhi', 'Mehrauli', 'Faridabad', 'Ghaziabad', 'Shahdara', 'Gurgaon', 'Gurugram', 'Noida', 'Noida Extension', 'Greater Noida', 'Kanpur', 'Kanpur Nagar', 'Hyderabad'];
  const validcity = ['Delhi', 'New Delhi', 'Faridabad', 'Ghaziabad',  'Gurugram', 'Noida', 'Noida Extension', 'Greater Noida', 'Kanpur', 'Hyderabad'];
  const statesWithCities = {
    "Delhi": ["New Delhi", "Delhi"],
    "Uttar Pradesh": ["Noida", "Kanpur", "Ghaziabad"],
    "Haryana": ["Gurugram" , "Faridabad"],
    "Telangana"  : ["Hyderabad"]

};

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const handleStatenewChange = (e) => {
        setSelectedState(e.target.value);
        setState(e.target.value);
        setSelectedCity(''); // Reset city when state changes
        setCity('');
        setOriginalCity('');
        setGstNo('');
        setGstError('');
    };

    const handleCitynewChange = (e) => {
        setSelectedCity(e.target.value);
        setCity(e.target.value);
        setOriginalCity(e.target.value);
    };
  const [cityerrormsg , setCityErrorMsg] = useState('')
  let defaultValue = '';
  const router = useRouter();
  // const [easebuzzkey , easebuzzsalt] = ['WJE5UAJ51D', 'Y3LVJ15S3M'];
//   const [paymentID , setPaymentID] = useState(null)
  // Rest of the code...

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentHour = currentDate.getHours();

  //   let nextBookingDate = new Date();
  //   let nextBookingTime = '';

  //   if (currentHour >= 20) { // If current time is 8 PM or later
  //     nextBookingDate.setDate(currentDate.getDate() + 1); // Move to the next day
  //     nextBookingTime = '09:00'; // Set the default time to 9 AM
  //     defaultValue =  dayjs().set('hour', 9).set('minute', 50).startOf('minute');
  //     // console.log('inside condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   } else {
  //     nextBookingTime = `${currentHour + 1}:00`; // Set the default time to the next hour
  //     defaultValue = dayjs().set('hour', `${currentHour+1}`).set('minute', 50).startOf('minute');
  //     // console.log('else condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   }
  //   // const defaultValue = dayjs().set('hour', `${currentHour+1}`).set('minute', 50).startOf('minute');
  //   // console.log('currentHour',currentHour);
  //   // const defaultValue = nextBookingTime ;
  //   // dayjs().set('hour', currentHour).set('minute', 50).startOf('minute');
  //   const year = nextBookingDate.getFullYear();
  //   const month = String(nextBookingDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(nextBookingDate.getDate()).padStart(2, '0');
  //   const newdateupdate = `${year}-${month}-${day}`;
  //   setBookingDate(`${year}-${month}-${day}`);    
  //   setBookingTime(nextBookingTime);
  //   // console.log(nextBookingTime)
  //   const bookingDateTimeString = `${newdateupdate}T${nextBookingTime}:00+05:30`; 
  //   setBookingDateTime(bookingDateTimeString);
    
  // }, []);
  // useEffect(()=>{
  //   const currentDate = new Date();

  //   let year = currentDate.getFullYear();
  //   let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  //   let day = ('0' + currentDate.getDate()).slice(-2);

  //   let formattedDate = `${year}-${month}-${day}`;
  //   console.log('currentdata = ', currentDate)
  //   console.log('bookingdata = ', bookingDate)
  //   if(formattedDate != bookingDate){
  //     defaultValue =  dayjs().set('hour', 9).set('minute', 50).startOf('minute');
  //     // console.log('inside condition def vl = ', defaultValue)
  //     setDfval(defaultValue);
  //   }
  // }, [bookingDate]);
  // useEffect(() => {
  //   if(originalCity != ''){
  //     const foundCity = currentworkingcities.find(
  //       (workingCity) => workingCity.toLowerCase() === originalCity.toLowerCase()
  //     );
  //       // console.log('foundCity', foundCity);
  //     if (!foundCity) {
  //       setCityErrorMsg(
  //         'Sorry, currently our services are not available in your city. We appreciate your interest, and we will be expanding to your city soon! Please check back later.'
  //       );
  //     } else {
  //       setCityErrorMsg('');
  //       setOriginalCity(foundCity);
  //       setCity(foundCity);
  //     }
  //   }
  // }, [city, currentworkingcities]);

  useEffect(() => {

    const currentDateTime = new Date();
    currentDateTime.setUTCHours(currentDateTime.getUTCHours() + 1); // Add 1 hour in UTC

    // Format the date in the "yyyy-MM-ddThh:mm" format in UTC
    const formattedMinDateTime = currentDateTime.toISOString().slice(0, 16);
    
    // Set the minimum date and time for the input
    setMinDateTime(formattedMinDateTime);
  }, []);
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setBookingDate(e.target.value);
    // setBookingTime
    if(bookingTime != ''){
      const bookingDateTimeString = `${selectedDate}T${bookingTime}:00+05:30`; 
      setBookingDateTime(bookingDateTimeString);
    }
  };
  const handleTimeChange = (e) => {
    const timeset = e.target.value ;
    setBookingTime(e.target.value);
    if(bookingDate != ''){
      const bookingDateTimeString = `${bookingDate}T${timeset}:00+05:30`; 
      setBookingDateTime(bookingDateTimeString);
    }
    
  };

  // const handleDateTimeChange = (e) => {
  //   console.log('datetime value = ',e.target.value);
  //   setBookingDateTime(e.target.value);
  // };

//   const [bookingDate, setBookingDate] = useState('');
//   const [bookingTime, setBookingTime] = useState('');

//   // Rest of the code...
const handlePaymentChange = (val) => {
    setPaymentMethod(val);
    const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
    setBookingDateTime(bookingDateTimeString);
    console.log('Payment Method - ', paymentMethod)
    console.log('Booking Time - ', bookingDateTimeString)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    // ////console.log('name - ', name)
  };
  const handleAddChange = (event) => {
   
    // ////console.log('add - ', add)
    if( event.target.value.length < 1000){
      setErrorMsgAdd('')
      setAdd(event.target.value);
    }else{
      setErrorMsgAdd('Please Enter Details within 100 characters')
      console.log('area - ', event.target.value.length)
    }
  };
  const handleAreaChange = (event) => {
    
    // console.log('area - ', area)
    
    if( event.target.value.length < 1000){
      setErrorMsgArea('')
      setArea(event.target.value);
    }else{
      setErrorMsgArea('Please Enter Details within 50 characters')
      console.log('area - ', event.target.value.length)
    }
  };
  const handleCityChange = (event) => {
    // const trimmedCity = event.target.value.trim();
    const inputValue = event.target.value;
    
    const trimmedCity = inputValue.trim();
    setCity(inputValue);
    setOriginalCity(trimmedCity);
    
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
    // //console.log('state - ', state) 
  };
  const handleGstChange = useCallback((event) => {
        const gstValue = event.target.value.toUpperCase();
        if (gstValue === '' || /^[0-9A-Z]{15}$/.test(gstValue)) {
          setGstError('');
          setGstNo(gstValue);
        } else {
          setGstError('Please enter a valid 15-digit GST number');
          setGstNo(gstValue);
        }
      }, []);
  const handleZipChange = (event) => {
    setZip(event.target.value);
    // //console.log('zip - ', zip) 
  };
useEffect(() => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const fetchUserProfile = async () => {
        const URL = 'https://support.homofixcompany.com/api/Customer/'
      try {
        // Make the API call to fetch the user profile data
        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
         //console.log('userData', userData[0])
        //  //console.log('cartItems', cartItems[0].productName)
        //console.log('amount', PaymentAmount)
          setUserProfileInfo(userData[0]);
        } else {
          // Handle error case when the response is not ok
          //console.log('token val in error', token)

          console.error('Error fetching user profile data');
        //   router.push('/'); // Redirect to homepage if there is an error
        }
      } catch (error) {
        // Handle error case when an exception occurs during the API call
        console.error('Error fetching user profile data:', error);
        // router.push('/'); // Redirect to homepage if there is an error
      }
    } 
    if (!token) {
        // Redirect to the homepage if there is no token
        // fetchUserProfile();
        router.push('/');
      }
       else {
        fetchUserProfile();
      }
}, [URL]);



const handleProfileDataUpdate = () =>{
    const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; // Replace with your actual authentication token
    const Burl = `https://support.homofixcompany.com/api/customer/profile/update/`;

    let profiledata = {
        'address': add,
        'area' : area, 
        'city' : originalCity,
        'first_name' : name,
        'state': state,
        'zipcode': zip,
        'gst_no': gstNo,
    }
    // console.log('profiledata', profiledata)
    const postProfile = async () =>{
        try {
            const response = await fetch(Burl, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify(profiledata),
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log(data);
            } else {
              console.error("Request failed with status:", response.status);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
    }
    postProfile()
}
const handleOnlinePayment = async() => {
    const apiKey = 'rzp_test_C8XkYZBi6Tpn1G';
    const apiSecret = 'izRT1cAew7L1lfmQfbelyJZs';
    let localbookindID = '';
    const authToken = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const valord = {
    amount: PaymentAmount * 100,
    currency: 'INR',
    receipt: 'rep_001',
    };

    const data = await fetch("/api/v1/orders", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${authToken}`,
    },
    body: JSON.stringify(valord),
    }).then((t) => t.json());
          // //console.log('data', data);
        const razorpayOptions = {
            key: apiKey, // Replace with your Razorpay key ID
            amount: PaymentAmount * 100, // Replace with the actual amount to be charged
            currency: 'INR', // Replace with the appropriate currency code
            name: 'Homofix Company', // Replace with your company name
            description: 'Home Service', // Replace with the payment description
            order_id: data.id, // Replace with your unique order ID
            handler: (response) => {
              // Payment successful, perform necessary actions
              // //console.log('Payment successful:', response)
              handleBookingDetailsinner({ COS: 'False', OL: 'True' , PaymentID: response.razorpay_payment_id})
              handleProfileDataUpdate()
              // setBookingCompleted(true);
              // Congratsmesg();
              // setCongBookingShow(true)
            },
            prefill: {
              name: name, // Replace with the customer's name
              contact: userProfileInfo.mobile, // Replace with the customer's phone number
            },
            theme: {
              color: '#F37254', // Replace with your desired color theme
            },
          };

        if (typeof window !== 'undefined' && window.Razorpay) {
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            razorpayInstance.open();
            } else {
            console.error('Razorpay script is not loaded.');
            }
        // handlePaymentRep()
    }
const handleBookingDetailsinner = ({COS='False' , OL='True' , PaymentID}) =>{
  const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; 
  // //console.log('cartItems' , cartItems)
  // console.log('cbookingDateTimeos ' , bookingDateTime)
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  let payload = {
      "booking_date": bookingDateTime,
      "customer": customer,
      "coupon": couponID,
      "cash_on_service": COS,
      "online": OL,
      "booking_product": cartItems,
      "booking_address": add,
        "area": area,
        "city": originalCity,
        "state": state,
        "booking_customer": name,
        "mobile":  userProfileInfo.mobile,
        "zipcode": zip,
        "gst_no": gstNo,
  }
  console.log('payload', payload)
  // const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  const url = "https://support.homofixcompany.com/api/create_booking/";

  const postData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });
     
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        let localbookindID = data.data.id ;
        handlePaymentRep(PaymentID, localbookindID)
        //console.log('loc in booking', localbookindID)
        
      //   //console.log( 'bookingID-handleBookingDetailsinner', data.data.id);
      //   setBookingID(data.data.id)
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  postData();
}
const handlePaymentRep = (paymentID ,localbookindID )=>{
  const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;  
  // url = 'https://support.homofixcompany.com/api/customer/payments/'
  // //console.log('PayID' , paymentID)
  // //console.log('bookingID' , localbookindID)
  // //console.log('PaymentAmount' , PaymentAmount)
  let rept = {
      "payment_id": paymentID,
      "payment_mode": 'Online',
      "amount": PaymentAmount,
      "booking_id": localbookindID,
  }
  const postResp = async () => {
      try {
        const response = await fetch('https://support.homofixcompany.com/api/customer/payments/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(rept),
        });
    
        if (response.ok) {
          const data = await response.json();
          // //console.log(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    postResp()
}
const Congratsmesg = () => {
    // console.log('incongfun')
    // congratstextmsg();
    // //console.log(isBookingCompleted)
    if (isBookingCompleted) {
        // //console.log(isBookingCompleted)
        // congratstextmsg();
        return <CongBooking />;
      }
      return null;
}
const handleOfflinePayment = () => {
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  if (cityerrormsg) {
    // Display an alert or handle the error in your UI
    alert(cityerrormsg);
    return;
  }
  if(bookingDateTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date and Time');
    return;
  }
  if(bookingDate == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date');
    return;
  }
  if(bookingTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Time');
    return;
  }
  if(state == ''){
    setErrorMsg('Please Select State');
  }
  if(originalCity == ''){
    setErrorMsg('Please Select City');
  }
  
  if(add == '' || area == '' || originalCity == '' ||  state =='' || zip==''){
    setErrorMsgAdd('Please Enter Full Address!!');
    return;
  } 
  if(name == ''){
    setErrorMsgName('Please Enter Name');
    return;
  }
  
  console.log('state - ', state)
  console.log('city - ', originalCity)
  if(bookingDateTime != '' && add != '' && area != '' || originalCity != '' ||  state !='' || zip!='' && name != ''){
    setErrorMsg('');
    setErrorMsgName('');
    setErrorMsgAdd('');
    handleBookingDetails({ COS: 'True', OL: 'False' });
    handleProfileDataUpdate();
    // setBookingCompleted(true);
    // Congratsmesg();
    // setCongBookingShow(true);
    router.push('/order/thankyou');
  }
  

  }
  const handleBookingDetails = ({COS , OL}) =>{
    const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null; 
    //console.log('inbooknow fun' , cartItems)
    //console.log('cos ' , COS)
    // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
    // setBookingDateTime(bookingDateTimeString);
    let payload = {
        "booking_date": bookingDateTime,
        "customer": customer,
        "coupon": couponID,
        "cash_on_service": COS,
        "online": OL,
        "booking_product": cartItems,
        "booking_address": add,
        "area": area,
        "city": originalCity,
        "state": state,
        "booking_customer": name,
        "mobile":  userProfileInfo.mobile,
        "zipcode": zip,
        "gst_no": gstNo,
    }
    console.log('payload', payload)
    // const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const url = "https://support.homofixcompany.com/api/create_booking/";

    const postData = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    postData();
  }
  const getLocation = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    // //console.log('usprofile', userProfileInfo)
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // //console.log( 'address',  data)
        const address = {
          road: data.address.state_district,
          city: data.address.city,
          state: data.address.state,
          residential :  data.address.residential,
          postcode :  data.address.postcode,
          state_district :  data.address.state_district,
          // Add additional address components as needed
        };
        setAddress(address);
        if(address){
            setAdd(address.residential || '');
            setName(name || '');
            setArea(address.road || '');
            setCity(address.city || '');
            setState(address.state || '');
            setZip(address.postcode || '');
        }
        
      } else {
        console.error('Failed to retrieve address');
      }
    } catch (error) {
      console.error('Error occurred while retrieving address:', error);
    }
    setLoading(false);
  }

  const handleLocation = () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          getLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error occurred while retrieving geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
    setLoading(false);
  };
// Update input fields when the address state changes
  useEffect(() => {
    // //console.log('in')
    // //console.log('userProfileInfo', userProfileInfo)
    if (userProfileInfo) {
        setAdd(userProfileInfo.address || '');
        setArea(userProfileInfo.area || '');
        setCity(userProfileInfo.city || '');
        setOriginalCity(userProfileInfo.city || '');
        setState(userProfileInfo.state || '');
        setZip(userProfileInfo.zipcode || '');
        setName(userProfileInfo.first_name || '');  
        setGstNo(userProfileInfo.gst_no || ''); 
    } else {
      setAdd(address.residential || '');
      setName(name || '');
      setArea(address.road || '');
      setCity(address.city || '');
      setOriginalCity(address.city || '');
      setState(address.state || '');
      setZip(address.postcode || '');
      setGstNo('');
    }
  }, [userProfileInfo]);

  const handleDatetimeval = (bookinttime) =>{
    const originalTime = bookinttime; // Your original time string
    const date = new Date(originalTime);
    const formatted = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formatted ;
  }
  const HashDatafind = ()=>{
    const uniqueID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const concatenatedString = `${easebuzzkey}|bookingID_${uniqueID}|${PaymentAmount}|Homofixcompany|${name}|info@homofixcompnay.com|||||||||||${easebuzzsalt}`;
    // Generate the hash using SHA-256
    const hash = crypto.createHash('sha512').update(concatenatedString).digest('hex');
    console.log('Generated Hash:', hash);

    const pData = {
        'key': easebuzzkey,
        'txnid' : `bookingID_${uniqueID}`,
        'amount': PaymentAmount,
        'productinfo': 'Homofixcompany',
        'firstname': name,
        'phone': '6202223861',
        'email': 'info@homofixcompnay.com',
        'hash': hash,
        'surl': 'https://homofixcompany.com/account',
        'furl': 'https://homofixcompany.com/account',
    };
    console.log('pdata', pData)
    return pData;
}
const handleOnlinePayment2 = async () => {
  
  if(bookingDateTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date and Time');
    return;
  }
  if(bookingDate == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Date');
    return;
  }
  if(bookingTime == '') {
    // Display an alert or handle the error in your UI
    setErrorMsg('Please Select Time');
    return;
  }
  if (cityerrormsg) {
    // Display an alert or handle the error in your UI
    alert(cityerrormsg);
    return;
  }
  if(add == '' || area == '' || originalCity == '' ||  state =='' || zip==''){
    setErrorMsgAdd('Please Enter Full Address!!');
    return;
  } 
  if(name == ''){
    setErrorMsgName('Please Enter Name');
    return;
  }
  // const bookingDateTimeString = `${bookingDate}T${bookingTime}:00+05:30`; 
  // setBookingDateTime(bookingDateTimeString);
  if(bookingDateTime != '' && add != '' && area != '' || originalCity != '' ||  state !='' || zip!='' && name != ''){
    setErrorMsg('');
    setErrorMsgName('');
    setErrorMsgAdd('');
    const SendData = HashDatafind();
    const URL = '/api/test';
    
    let access_key = '';
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(SendData),
          });
        const data = await response.json();
        // console.log(data);
        // setAccess_key(data.data);
        access_key = data.data;
        // //console.log(access_key);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    // //console.log('testing here');
    // console.log(SendData);
  
    const easebuzzCheckout = new EasebuzzCheckout(easebuzzkey, 'prod');
    const options = {
      access_key: access_key, // access key received via Initiate Payment
      onResponse: (response) => {
          ////console.log(response);
          if(response.status == 'success'){
            ////console.log('pay has been successfully done yo yo ');
            handleBookingDetailsinner({ COS: 'False', OL: 'True' , PaymentID: response.easepayid})
            handleProfileDataUpdate()
            // setBookingCompleted(true);
            // Congratsmesg();
            // setCongBookingShow(true);
            router.push('/order/thankyou');
          }
      },
      theme: "#123456" // color hex
    }
  easebuzzCheckout.initiatePayment(options);
  }
  
}
  
// const handleInputClick = () => {
//   const inputField = document.getElementById('bookingDateTime');
//   inputField.click();
// };
  return (
    <>
      <button className={cnames} onClick={() => setBookingShow(true)}>
        {title}
        
      </button>

      <Dialog as="div" open={bookingShow} onClose={() => setBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1300]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1300] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-md sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between border-b-2 pb-3">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Homofix Company</span>
              <h2 className="text-xl font-semibold">Booking</h2>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setBookingShow(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="my-6 flow-root">
            <div className=" divide-gray-500/10">
              {/* <h2>Name</h2> */}
              <label htmlFor="State">Name</label>

              <input type="text" value={name }  className="w-full py-2 my-2 border-indigo-800" onChange={handleNameChange} required />
              <p className='text-[red] text-sm'>{errormsgName}</p> 
               {/* <button className='my-2 text-basecolor' onClick={handleLocation}>Get Location</button> <br /> <br /> */}
              {loading ? <Loading /> :   <>
               <label htmlFor="Address">Full Address</label>
                <input type="text" value={add} onChange={handleAddChange} className="w-full py-2 my-2 border-indigo-800"  />
                <p className='text-[red] text-sm'>{errormsgadd}</p> 
                <label htmlFor="Area">Near By</label>
                <input type="text" value={area} onChange={handleAreaChange}  className="w-full py-2 my-2 border-indigo-800"  />
                {/* <label htmlFor="city">City</label>
                <input type="text" value={city} onChange={handleCityChange} className="w-full py-2 my-2 border-indigo-800"  /> */}
                <p className='text-[red] text-sm' >{errormsgadrea}</p>
                <label htmlFor="state">State</label>
                <select id="state" value={selectedState} onChange={handleStatenewChange} className="w-full py-2 my-2 border-indigo-800">
                    {/* <option value="">Select a state</option> */}
                    {/* {state === '' ?  <option value="" >Select a state</option> :  <option value={state} >{state}</option>} */}
                    <option value="" >Select a state</option>
                    {Object.keys(statesWithCities).map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                <label htmlFor="city">City</label>
                <select id="city" value={selectedCity} onChange={handleCitynewChange} className="w-full py-2 my-2 border-indigo-800">
                <option value="">Select a city</option>
                    {selectedState && statesWithCities[selectedState] && statesWithCities[selectedState].map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {/* <p className='text-[red] text-sm'>{cityerrormsg}</p> */}
                {/* <label htmlFor="State">State</label>
                <input type="text" value={state} onChange={handleStateChange} className="w-full py-2 my-2 border-indigo-800"  /> */}
                <label htmlFor="Pincode">Pincode </label>
                <input type="text" value={zip} onChange={handleZipChange} className="w-full py-2 my-2 border-indigo-800"  />
              
                <div className=" pb-5 ">
                    <div className="lable">
                        <h4>GST Number (Optional)</h4>
                        <p className='text-sm text-gray-400'>Your business GST number for invoicing</p>
                    </div>
                    <div className="lable py-3">
                        <input 
                            type="text" 
                            className='w-screen-full border-gray-600 text-gray-800 w-full' 
                            value={gstNo} 
                            onChange={handleGstChange}
                            placeholder="Enter 15-digit GST number"
                            maxLength={15}
                        />
                        {gstError && <p className='text-[red] text-sm'>{gstError}</p>}
                    </div>
                </div>
               </>
            }
              <div className="mt-2">
                
              <label htmlFor="bookingDateTime" className="block font-medium text-gray-700 text-sm mb-2">
                  Select Date & Time 
                </label>
                {/* <input
                  type="datetime-local"
                  id="bookingDateTime"
                  name="bookingDateTime"
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingDateTime}
                  onChange={(e)=>setBookingDateTime(e.target.value)}
                  className="w-full py-2 my-2 border-indigo-800"
                  
                /> */}

                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={bookingDate}
                  onChange={handleDateChange}
                  className="w-full py-2 my-2 border-indigo-800"
                  min={new Date().toISOString().split('T')[0]}
                /> 
                  <input
                  type="time"
                  id="bookingTime"
                  name="bookingTime"
                  value={bookingTime}
                  onChange={handleTimeChange}
                  className="w-full py-2 my-2 border-indigo-800"
                  
                /> 
                
                
              </div>
             <p className='text-[red] text-sm'>{errormsg}</p> 
              <div className='py-3'>
                <h3 >Payment Method</h3>
                <div className='mt-2'>
                {paymentMethod=='Online' ? (
                  <input type="radio" name="PAYMENT" id="payment-method" 
                  value='Online' 
                  onChange={()=>{handlePaymentChange('Online')}}
                  checked
                   />
                ):(
                  <input type="radio" name="PAYMENT" id="payment-method" 
                value='Online' 
                onChange={()=>{handlePaymentChange('Online')}}
                 />
                )}
                

                <label htmlFor="PAYMENT"> Make Payment</label><br />
                </div>
                <div className='mt-2'>
                <input type="radio" name="PAYMENT" id="payment-method"
                 value='Cash'
                 onChange={()=>{handlePaymentChange('Cash')}}   />
                <label htmlFor="PAYMENT"> Cash on Service</label><br />
                </div>
                
                {paymentMethod=='Online' ? (
                    <>
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto '
                      onClick={() => {
                        handleOnlinePayment2()
                      }}
                      >
                      Pay Now
                    </button>
                  </>

                ):(
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto ' onClick={handleOfflinePayment} >Book Now</button>

                )}
                {/* <div className='flex justify-between'>
                <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto '
                      onClick={() => {
                        handleOnlinePayment2()
                      }}
                      >
                      Pay Now
                    </button>
                    <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto ' onClick={handleOfflinePayment} >Cash on Service</button>
                </div> */}
                
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Dialog as="div" open={congBookingShow} onClose={() => setCongBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1500]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1500] w-full overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10 ">
          <div className="flex items-center justify-center border-b-2 py-10 bg-basecolor rounded-t-none rounded-3xl "> 
          </div>
          <div className="mb-6 flow-root items-center justify-center text-center px-2">
          <img src="/cracker.png" alt="congrats" width={120} className='mx-auto -mt-16' />
            <h2 className='text-3xl text-basecolor font-bold py-3'>Thank You!!</h2>
                <p className='text-sm text-gray-800'>You have successfully booked our services </p>
                <ul className='list-none'>
                    <li className='py-3 font-semibold text-lg'>Booking Date:Time - {handleDatetimeval(bookingDateTime) }</li>
                </ul>
                <Link href='/account' className='px-4 py-2 bg-basecolor text-white'> Go to Account</Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export { Booking };