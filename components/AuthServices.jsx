"use"
import { Fragment, useState,  useContext} from 'react'
import { AuthContext } from './AuthContext'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline'


  
const AuthServices = ({cnames , title}) => {

    let [showLogin , setshowLogin] = useState(false);
    let [showOtpLogin , setshowOtpLogin] = useState(false);
    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [otpval,setotpval] = useState('');

    const authContext = useContext(AuthContext)
    const userInfo = authContext.userInfo

   
    // setshowLogin(showLoginpop)

    const handleSendOTP = async () => {
      // setshowLogin(false);
      try {
        // const url = "https://support.homofixcompany.com/api/Send/Otp/";
        const url = `/api/otp/?phone=${phone}`;
        const response = await fetch(url) ;
        // const response = await fetch(url , {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({phone_number : phone}),
        // });
        const result = await response.json();
        let otpSession = result.otp_session;
        // //console.log(otpSession)
        setotpval(otpSession);
        // const response = true;
        if (response) {
          // //console.log('Response:', result);
          setshowLogin(false)
          setshowOtpLogin(true)
          // setMessage('OTP has been sent successfully!');
        } else {
          setMessage('Failed to send OTP. Please try again.');
        }
      } catch (error) {
        // //console.log(error);
        setMessage('catch Failed to send OTP. Please try again.');
      }
    };
    const handleVerifyOTP = async () => {
  
      if (verificationCode == otpval){
        try {
          // const response = await fetch( 'https://support.homofixcompany.com/api/CustomerLogin/'  , {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ phone_number : phone }),
          // })
          const response = await fetch( `/api/customerLogin/?phone=${phone}`)
          
          if (response.ok) {
            const result = await response.json();
            // //console.log('Response:', result);
            handleOTPValidationResponse(result)
            setshowOtpLogin(false)
            setMessage('');
          } else {
            // //console.log(response);
            setMessage('Failed to Match Otp. Please try again.');
          }
        } catch (error) {
          // console.log(error);
          setMessage('Error On Sendting Data. Please try again.');
        }
      }else{
        setMessage('OTP is not valid!');
      }
      
      }


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
        authContext.logout();
      }
      const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        };
      
      const handleVerificationCodeChange = (event) => {
      setVerificationCode(event.target.value);
      };

    return (
      <>
        <button className={cnames} onClick={() => setshowLogin(true)} >{title}</button>


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
                  <span className='pt-4'>Login/Singup</span> 
                  <button
                      type="button"
                      onClick={() => setshowLogin(false)}
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
                      onClick={() => setshowOtpLogin(false)}
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
      </>
    )
  }
 
  export {AuthServices};



  
  
  
 
   

     
      
  