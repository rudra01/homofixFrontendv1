"use client"
import { useState , useCallback, Fragment , useRef} from 'react';
import { Dialog , Transition } from '@headlessui/react';
import {
    XMarkIcon,
  
  } from '@heroicons/react/24/outline'

const RegisterExp = () => {
    const [isShow, setIsShow] = useState(false);
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [mno , setMno] = useState('')
    const [exType , setExType] = useState('')
    const [selectedFile , setSelectedFile] = useState(null)
    const [address , setAddress] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const fileInputRef = useRef(null);
    const handleBlank = useCallback(()=>{
        //console.log('blankfun')
        setName('')
        setEmail('')
        setMno('')
        setExType('')
        setAddress('')
        // setSuccessMsg('')
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input
        }
    }, [])
    const handleName = useCallback((event) => {
        setName(event.target.value);
      }, []);
    const handleEmail = useCallback((event) => {
        setEmail(event.target.value);
    }, []);
    const handleMno = useCallback((event) => {
        setMno(event.target.value);
    }, []);
    const handleExType = useCallback((event) => {
        setExType(event.target.value);
    }, []);
    const handleResume = useCallback((event) => {
        setSelectedFile(event.target.files[0]);
      }, []);
    const handleAddress = useCallback((event) => {
        setAddress(event.target.value);
    }, []);

    const handleSendformData = useCallback(() => {
      if(name != '' || mno!=''|| exType!=''|| address!='' ){
        const applyData = new FormData();
        applyData.append('name', name);
        if(email){
          applyData.append('email', email);
        }
        applyData.append('mobile', mno);
        // applyData.append('resume', selectedFile);
        applyData.append('expert_in', exType);
        applyData.append('full_address', address);
        if (selectedFile) {
            // File is not empty
            if (selectedFile.type !== 'application/pdf') {
              // //console.log('Resume file must be in PDF format');
              return;
            }
        
            applyData.resume = selectedFile;
          }
     
    const postjob = async () => {
      const URL = 'https://support.homofixcompany.com/api/JobEnquiry/'
        try {
          const response = await fetch(URL, {
            method: "POST",
            body: applyData,
          });
      
          if (response.ok) {
            const FeedbackData = await response.json();
            //console.log(FeedbackData);
            setSuccessMsg('Form Has Been Submitted');
            setErrorMsg('');
            handleBlank();
          } else {
            console.error("Request failed with status:", response.status);
            console.error("Response:", response);
           

          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
      postjob()
      }else{
        setErrorMsg('Please fill all the mandatory fields');
      }
        
      }, [exType, address, mno, name,selectedFile, email])

    const handleClick = useCallback(() => {
        setIsShow(false);
        setSuccessMsg('')
        setErrorMsg('');
      }, [URL]);
  return (
    <>
    <button onClick={() => setIsShow(true)} className="bg-basecolor hover:bg-lightbasecolor px-3 py-1 md:py-3 md:px-7 text-white my-3 rounded items-center">Register Now</button>
     {/* <Dialog as="div" open={isShow} onClose={() => setIsShow(false)}> */}
     {/* <div  open={isShow} onClose={() => setIsShow(false)}> */}
        {/* Dialog content */}
        {/* <div className="fixed inset-0 z-50" /> */}
        {/* <Dialog.Panel className="fixed inset-y-0 right-0 z-[1500] w-full overflow-y-auto bg-[#CAC7CE]  sm:ring-1 sm:ring-gray-900/10"> */}
            {/* <div className="grid md:grid-cols-5"> */}
                {/* <div className='bg-[#004AAC] h-screen col-span-3 hidden md:block overflow-hidden'>
                  <img src="expbg.webp" alt="exp" className='mx-auto w-full h-full' />
                </div> */}
                {/* <div className='bg-gray-200 h-screen  md:col-span-2'> */}
                    {/* <div className="w-full py-4 flex justify-between px-6 border-gray-300 border-b-2 ">
                        <h5 className='font-semibold text-xl '>Apply Now</h5>
                        <XMarkIcon className="w-7 mr-5 cursor-pointer" onClick={handleClick}  />
                    </div> */}
                    {/* <div className="mt-5 ">
                        {successMsg && (
                          <h2 className="text-indigo-400 text-lg py-3 text-center">{successMsg}</h2>
                        )}
                        {errorMsg && (
                          <h2 className="text-red text-lg py-3 text-center">{errorMsg}</h2>
                        )}
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Name</label>
                            <input type="text" className='w-full' value={name} onChange={handleName} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label  className='pb-2 font-medium'>Mobile No</label>
                            <input type="number" className='w-full' max='10' min='10' value={mno} onChange={handleMno}  />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Email <span className='text-sm text-red'>(Optional)</span> </label>
                            <input type="email" className='w-full' value={email} onChange={handleEmail} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Expert Type</label>
                            <input type="text" className='w-full' value={exType} onChange={handleExType} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label  className='pb-2 font-medium'>Address</label>
                            <textarea  className='w-full' rows='3' value={address} onChange={handleAddress}></textarea>
                        </div>
                        <div className='flex flex-col px-6 pb-3 '>
                            <label  className='pb-2 font-medium'>Resume <span className='text-sm text-red'>(Optional)</span></label>
                            <input type="file" className='w-full' ref={fileInputRef} onChange={handleResume}  />
                            <button className='bg-basecolor py-2 px-4 mt-5 text-white font-medium' onClick={handleSendformData}> Submit</button>

                        </div>
                    </div> */}
                {/* </div> */}
            {/* </div> */}
        {/* </Dialog.Panel> */}
      {/* </div> */}
      {/* </Dialog> */}


      <Transition appear show={isShow} as={Fragment} >
        <Dialog as="div" className="relative z-[1500]" onClose={() => setIsShow(false)}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between align-middle text-lg font-medium leading-6 text-gray-900"
                  >
                  <div  width={50} alt="" />  
                  <span className='pt-4 font-semibold text-xl'>Apply Now</span> 
                  <button
                      type="button"
                      onClick={() => setIsShow(false)}
                    >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button> 
                  </Dialog.Title>
                  

                  <div className="mt-4">
                  {successMsg && (
                          <h2 className="text-indigo-400 text-lg py-3 text-center">{successMsg}</h2>
                        )}
                        {errorMsg && (
                          <h2 className="text-red text-lg py-3 text-center">{errorMsg}</h2>
                        )}
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Name</label>
                            <input type="text" className='w-full' value={name} onChange={handleName} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label  className='pb-2 font-medium'>Mobile No</label>
                            <input type="number" className='w-full' max='10' min='10' value={mno} onChange={handleMno}  />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Email <span className='text-sm text-red'>(Optional)</span> </label>
                            <input type="email" className='w-full' value={email} onChange={handleEmail} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label className='pb-2 font-medium'>Expert Type</label>
                            <input type="text" className='w-full' value={exType} onChange={handleExType} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label  className='pb-2 font-medium'>Address</label>
                            <textarea  className='w-full' rows='3' value={address} onChange={handleAddress}></textarea>
                        </div>
                        <div className='flex flex-col px-6 pb-3 '>
                            <label  className='pb-2 font-medium'>Resume <span className='text-sm text-red'>(Optional)</span></label>
                            <input type="file" className='w-full' ref={fileInputRef} onChange={handleResume}  />
                            <button className='bg-basecolor py-2 px-4 mt-5 text-white font-medium' onClick={handleSendformData}> Submit</button>

                        </div>
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

export default RegisterExp