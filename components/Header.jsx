"use client"
import { Fragment, useState,  useContext, useRef , useEffect} from 'react'
import { AuthContext } from './AuthContext'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
// import { LogoutIcon } from '@heroicons/react/outline'
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon  } from '@heroicons/react/20/solid'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let [showLogin , setshowLogin] = useState(false);
  let [showOtpLogin , setshowOtpLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [otpval,setotpval] = useState('');
  const [subMenu , setSubMenu] = useState('hidden')
  const submenuRef = useRef();


  useEffect(() => {
    // Function to handle clicks outside the UserCircleIcon submenu
    //console.log('userEffect fun called')
    const handleOutsideClick = (event) => {
      // if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      //   setSubMenu('hidden');
      //   //console.log('In > userEffect fun called')

      // }
    };

    // Function to handle scroll events
    const handleScroll = () => {
      setSubMenu('hidden');
    };

    // Add event listeners when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handlesubchange = () =>{
    // //console.log('handlesubchange activated');
    if(subMenu == 'hidden'){
      setSubMenu('block')
    // //console.log('set submenu - block');
    }else{
      setSubMenu('hidden')
    // //console.log('set submenu - hidden');

    }
  }
  const handleaccount = () => {
    // //console.log('acount butn clicked');
    setSubMenu('hidden')
  }
  const handlePhoneChange = (event) => {
  setPhone(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
  setVerificationCode(event.target.value);
  };
  // const generateOTP = () => {
  //   return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  // };
  const authContext = useContext(AuthContext)
  const userInfo = authContext.userInfo
  const handleSendOTP = async () => {
    // setshowLogin(false);
    // //console.log('inclick')
    if(phone != ''){
      setMessage('');
      setshowLogin(false)
      setshowOtpLogin(true)
      try {
        // const url = "https://support.homofixcompany.com/api/Send/Otp/";
        const url = `/api/otp/?phone=${phone}`;
        const response = await fetch (url , {cache : 'no-store'})
        const result = await response.json();
        let otpSession = result.otp_session;
        // //console.log(otpSession)
        setotpval(otpSession);
        // const response = true;
        if (!response) {
          // //console.log('Response:', result);
          setshowLogin(true)
          setshowOtpLogin(false)
          setMessage('Failed to send OTP. Please try again.');
          // setMessage('OTP has been sent successfully!');
        }
        //  else {
        //   setshowLogin(true)
        //   setshowOtpLogin(false)
        //   setMessage('Failed to send OTP. Please try again.');
        // }
      } catch (error) {
        console.log(error);
        setMessage('catch Failed to send OTP. Please try again.');
      }
    }else{
      setMessage('Please Enter a Valid Phone Number');
    }
    
  };
  
  const handleOTPValidationResponse = (response) => {
    const { token, user, message } = response;

    // Check if the response indicates successful login
    if (token && user && message === 'Logged in successfully.') {
      authContext.login(token, user);
      // Additional logic if needed
    } else {
      // Handle error case
    }
  };
  const handleLogout = () => {
    setPhone('')
    setotpval('')
    authContext.logout();
  };
  const handleVerifyOTP = async () => {

  if (verificationCode != '' && verificationCode === otpval){
    setMessage('');

    const url = `/api/otpValidation/?phone=${phone}`;
    try {
      // const response = await fetch( 'https://support.homofixcompany.com/api/CustomerLogin/'  , {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ phone_number : phone }),
      // })
      const response = await fetch( url , {cache : 'no-store'}) 
      if (response.ok) {
        const result = await response.json();
        // //console.log('Response:', result);
        handleOTPValidationResponse(result)
        setshowOtpLogin(false)
        setPhone('')
        setotpval('')
      } else {
        console.log(response);
        setMessage('Failed to Match OTP. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error On Sendting Data. Please try again.');
    }
  }else{
    setMessage('OTP is not valid!');
  }
  
  };
  return (
    <header className="bg-white top-0 sticky z-[1200] px-6 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center  justify-between py-3  z-[1200] lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Homofix Company</span>
            <img  src="/logodark.png" alt="homofix-logo" width={120}  />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
        {userInfo ? (
          <div className="relative">
          <button
          type="button"
          onClick={handlesubchange}
          className="flex text-sm font-semibold leading-6 text-gray-900 items-center"
        >
          <span>
            <UserCircleIcon className="w-6 mr-3" />
          </span>
          <span className="">
            {/* {userInfo.username} */}
            </span>
          {/* <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" /> */}
        </button>
          <div ref={submenuRef} className={`${subMenu} origin-top-right absolute z-[1500] right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            {/* <Link
              href="/account"
              // className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              // onClick={handlesubchange}
            > */}
              <Link 
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleaccount()}
              // onClick={handlesubchange}
              >
              <UserIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Account
              </Link>
              {/* <UserIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Account  */}
            {/* </Link> */}
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}
            >
              <KeyIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
        ):(<button onClick={() => setshowLogin(true)} className=" mr-2 rounded text-sm px-2 py-2 bg-basecolor text-white hover:bg-white hover:text-basecolor">
        Login / Sign Up
      </button>)}
        
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {userInfo ? (
          <div className="relative">
          <button
          type="button" onClick={handlesubchange}
          className="flex text-sm font-semibold leading-6 text-gray-900 items-center"
        >
          <span>
            <UserCircleIcon className="w-6" />
          </span>
          <span className="ml-1">
            {/* {userInfo.username} */}
            </span>
          <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
        </button>
          <div ref={submenuRef} className={`${subMenu} origin-top-right absolute z-[1500] right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            
            <Link href="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            // onClick={handlesubchange}
            onClick={() => handleaccount()}
            >
              <UserIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Account 
            </Link>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}
            >
              <KeyIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
        ) : (
          <button onClick={() => setshowLogin(true)} className="flex text-sm font-semibold leading-6 text-gray-900 ">
          <span><UserCircleIcon className="w-6" /> </span>  Login / Sign Up <span aria-hidden="true">&rarr;</span>
          </button>
           )}
        </div> 
      </nav>
      
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        
        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1500] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="homofixcompany"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <hr />
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                   Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                   About Us
                </Link>
                <Link
                  href="/career"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Career
                </Link>
                <Link
                  href="/blogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Blogs
                </Link>
                <Link
                  href="/addons"
                  onClick={() => setMobileMenuOpen(false)}

                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Addon Services & Spare Parts
                </Link>
                <Link
                  href="/contactus"
                  onClick={() => setMobileMenuOpen(false)}

                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
              {/* <div className="py-6">
                <button onClick={() => setshowLogin(true)} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
               <span><UserCircleIcon className="w-9 mr-4" /> </span>  Log in / Signup <span aria-hidden="true">&rarr;</span>
          </button>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Transition appear show={showLogin} as={Fragment} >
        <Dialog as="div" className="relative z-10" onClose={() => setshowLogin(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between align-middle text-lg font-medium leading-6 text-gray-900"
                  >
                  <img src="/login.png" width={50} alt="" />  
                  <span className='pt-4'>Login/Signup</span> 
                  <button
                      type="button"
                      onClick={() => {
                        setPhone('')
                        setMessage('')
                        setotpval('')
                        setVerificationCode('')
                        setshowLogin(false)}
                      }
                    >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button> 
                  </Dialog.Title>
                  <div className="my-5 text-center">
                    
                  {/* <h1>Phone Verification</h1> */}
                  
                  {/* <label>Phone Number:</label> */}
                  <input type="number" value={phone} onChange={handlePhoneChange} placeholder='Mobile Number' className='w-full py-2 px-2 border mt-2 form-input' required min={10} max={10}  />
                  <button onClick={handleSendOTP} className='bg-basecolor text-white  py-2 px-4 my-3 rounded'>Send OTP</button>
                  <br />
                  <p className='text-red'>{message}</p>

                  </div>

                  <div className="mt-4">
                   
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      <Transition appear show={showOtpLogin} as={Fragment} >
        <Dialog as="div" className="relative z-10" onClose={() => setshowOtpLogin(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between align-middle text-lg font-medium leading-6 text-gray-900"
                  >
                  <img src="/login.png" width={50} alt="" />  
                  
                  <span className='pt-4'>Verification Code:</span> 
                  <button
                      type="button"
                      onClick={() => {
                        setVerificationCode('')
                        setPhone('')
                        setMessage('')
                        setVerificationCode('')
                        setotpval('')
                        setshowOtpLogin(false)
                      }}
                    >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button> 
                  </Dialog.Title>
                  <div className="my-5 text-center">
                  
                  <input
                      type="number"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      placeholder='OTP'
                      className='w-full py-2 px-2 border mt-2 form-input' 
                    />
                  <button onClick={handleVerifyOTP} className='bg-basecolor text-white  py-2 px-4 my-3 mr-9 rounded '>Verify OTP</button>
                  <button onClick={()=> {
                    setshowOtpLogin(false)
                    setshowLogin(true)
                    setVerificationCode('')
                    setPhone('')
                    setotpval('')
                    setMessage('')
                  }}  className='bg-basecolor text-white  py-2 px-4 my-3 rounded '>Back</button>
                  <br />

                  <p className='text-red'>{message}</p>

                  </div>

                  <div className="mt-4">
                   
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </header>
  )
}
