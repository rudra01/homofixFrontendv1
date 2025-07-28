"use client"
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState, Fragment, useCallback  } from 'react';

const Feedback = ({bookingID}) => {
    let [isOpenFeedback, setIsOpenFeedback] = useState(false)
    let [isOpenFeedbackThankYou, setIsOpenFeedbackThankYou] = useState(false)
    const [rating , setRating] = useState('')
    const [ review , setReview] = useState('')
    const [msg , setMsg] = useState('')
    

        const closeFeedback = useCallback(() => {
            setIsOpenFeedback(false);
            setMsg('')
            setReview('')
            setRating('')
          }, []);
        
          const openFeedback = useCallback(() => {
            setIsOpenFeedback(true);
          }, []);
        const openMessage = useCallback((msg) => {
            setMsg(msg);
          }, []);
        const handleRatingReview = useCallback((event) => {
            setReview(event.target.value);
          }, []);
        
          const handleSendFeedback = useCallback(() => {
            const feedData = {
              booking_id: bookingID,
              rating: rating,
              description: review,
            };
            // //console.log('feedback', feedData);
        const URL = 'https://support.homofixcompany.com/api/Feedback/'
        const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;  
        const postProfile = async () => {
            try {
              const response = await fetch(URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(feedData),
              });
              if (response.ok) {
                const FeedbackData = await response.json();
                // console.log(FeedbackData);
                // openMessage('Feedback has been submitted')
                setIsOpenFeedback(false)
                setIsOpenFeedbackThankYou(true)
                setRating('')
                setReview('')
              } else {
                console.error("Request failed with status:", response.status);
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
          }
          postProfile()
          }, [bookingID, rating, review]);
  return (
    <>
    <button className=' cursor-pointe rounded-full border border-yellow-500 bg-yellow-500 text-white px-4 py-2 text-xs ' onClick={openFeedback}> Give Rating</button>
    <Transition appear show={isOpenFeedback} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeFeedback}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                    {/* <img src="/cracker.png" alt="congs" width={100}  className='mx-auto pb-4' /> */}
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Feedback 
                    
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="flex justify-center m-3">
                        <button  onClick={() => setRating('1')}>
                            <img src="/star.png" width={45} alt="rating" className={`p-1 m-1 ${rating === '1' ? 'border-yellow-400 border-2' : 'hover:border-yellow-400'}`} />
                            <h5 className='text-sm'>1</h5>
                        </button>
                        <button   onClick={() => setRating('2')}>
                            <img src="/star.png" width={45} className={`p-1 m-1 ${rating === '2' ? 'border-yellow-400 border-2' : 'hover:border-yellow-400'}`}alt="rating" />
                            <h5 className='text-sm'>2</h5>

                        </button>
                        <button   onClick={() => setRating('3')}>
                            <img src="/star.png" width={45} className={`p-1 m-1 ${rating === '3' ? 'border-yellow-400 border-2' : 'hover:border-yellow-400'}`} alt="rating" />
                            <h5 className='text-sm'>3</h5>
                        </button>
                        <button   onClick={() => setRating('4')}>
                            <img src="/star.png" width={45} className={`p-1 m-1 ${rating === '4' ? 'border-yellow-400 border-2' : 'hover:border-yellow-400'}`} alt="rating" />
                            <h5 className='text-sm'>4</h5>
                        </button>
                        <button   onClick={() => setRating('5')}>
                            <img src="/star.png" width={45} className={`p-1 m-1 ${rating === '5' ? 'border-yellow-400 border-2' : 'hover:border-yellow-400'}`} alt="rating" />
                            <h5 className='text-sm'>5</h5>
                        </button>
                    </div>
                    <textarea  placeholder="Review" className='w-full' onChange={handleRatingReview} rows="5" value={review} ></textarea>
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-basecolor px-4 py-2 text-sm font-medium text-white hover:bg-lightbasecolor focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSendFeedback}
                    >
                      Submit
                    </button>
                    <br />
                    <p className='mt-3 text-red'>{msg}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
    </Transition>


    <Transition appear show={isOpenFeedbackThankYou} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeFeedback}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                    {/* <img src="/cracker.png" alt="congs" width={100}  className='mx-auto pb-4' /> */}
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    <img src="/cracker.png" alt="congrats" width={100} className='mx-auto ' /> 
                    
                  </Dialog.Title>
                  <div className="mt-4">
                    <h2 className='text-Red-700 text-lg'>
                      Thank You for Your Feedback!!
                    </h2>
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center rounded-md border border-transparent bg-basecolor px-4 py-2 text-sm font-medium text-white hover:bg-lightbasecolor focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{setIsOpenFeedbackThankYou(false)}}
                    >
                      Close
                    </button>
                    <br />
                    <p className='mt-3 text-red'>{msg}</p>
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

export default Feedback