"use Client" 
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  // FaUserCircle,
} from '@heroicons/react/24/outline'
import { useState , Fragment, useCallback , useRef} from 'react'

const JobApply = ({JobID}) => {
    const [isFormVisible , setFormVisible] = useState(false)
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [mno , setMno] = useState('')
    const [successMsg , setSuccessMsg] = useState('')
    const fileInputRef = useRef(null);
    const [selectedFile , setSelectedFile] = useState(null)
   

    const handleBlank = useCallback(()=>{
        //console.log('blankfun')
        setName('')
        setEmail('')
        setMno('')
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
    
    const handleResume = useCallback((event) => {
        setSelectedFile(event.target.files[0]);
      }, []);
    
    const FetchData = useCallback(() => {
        const JobData = new FormData();
        JobData.append('name', name);
        JobData.append('email', email);
        JobData.append('mobile', mno);
        JobData.append('resume', selectedFile);
        JobData.append('carrer_id', JobID);
        if (selectedFile) {
            // File is not empty
            if (selectedFile.type !== 'application/pdf') {
              setSuccessMsg('Resume file must be in PDF format');
              return;
            }
        
            JobData.resume = selectedFile;
          }
        //   //console.log('selectedFile',selectedFile)
        // //console.log('jobdata',JobData)
        const handleSendJob = async () => {
            // setshowLogin(false);
            try {
              const url = "https://support.homofixcompany.com/api/ApplicantCarrer/";
              const response = await fetch(url , {
                method: 'POST',
                body: JobData,
              });
              const result = await response.json();
              if (response) {
                // //console.log('Response:', result);
                setSuccessMsg("Submitted Successfully")
                handleBlank()
              } else {
                // //console.log('error-respose', response)
                setSuccessMsg('Failed to send . Please try again.');
              }
            } catch (error) {
              // console.log(error);
              setSuccessMsg('catch Failed to send . Please try again.');
            }
          };
          handleSendJob()
    }, [name ,email ,mno, selectedFile,JobID ])
    const handlepopbox = ()=>{
        setFormVisible(false)
        setSuccessMsg(" ")

    }
  return (
    <>
        <button className="bg-basecolor px-4 py-2 text-white mx-auto text-center" onClick={() => setFormVisible(true)}>Apply</button>

        <Transition appear show={isFormVisible} as={Fragment} >
        <Dialog as="div" className="relative z-10" onClose={handlepopbox}>
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
                      onClick={handlepopbox}
                    >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button> 
                  </Dialog.Title>
                  

                  <div className="mt-4">
                        {successMsg && (
                          <p className="text-indigo-400 text-sm py-3 text-center">{successMsg}</p>
                        )}
                        <div className='flex flex-col px-6 pb-3'>
                            <label htmlFor="Name" className='pb-2 font-medium'>Name</label>
                            <input type="text" className='w-full' value={name} onChange={handleName} />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label htmlFor="Mno" className='pb-2 font-medium'>Mobile No</label>
                            <input type="number" className='w-full' max='10' min='10' value={mno} onChange={handleMno}  />
                        </div>
                        <div className='flex flex-col px-6 pb-3'>
                            <label htmlFor="Email" className='pb-2 font-medium'>Email  </label>
                            <input type="email" className='w-full' value={email} onChange={handleEmail} />
                        </div>
                        
                        <div className='flex flex-col px-6 pb-3 '>
                            <label htmlFor="Resume" className='pb-2 font-medium'>Resume </label>
                            <input type="file" className='w-full' ref={fileInputRef} onChange={handleResume}  />
                            <button className='bg-basecolor py-2 px-4 mt-5 text-white font-medium' onClick={FetchData}> Submit</button>

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

export default JobApply