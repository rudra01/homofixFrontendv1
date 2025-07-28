import { useEffect, useState } from "react"
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const Faq = ({ProID}) => {
    const [faqData , setFaqData] = useState([])
    useEffect(()=>{
        const URL = `https://support.homofixcompany.com/api/Faq-Get/${ProID}/`
        const fetchFaq = async () => {
            const res2 = await fetch(URL)
            const res = await res2.json();
            setFaqData(res)
        }
        fetchFaq();
        // console.log('faq' , faqData)
        
    } , [ProID])
  return (
    <>
        <div className="text-center">
        {faqData.length > 0  && (
            <h2 className="text-xl font-semibold py-4">FAQ'S</h2>  
        )}
            {/* <h2 className="text-xl font-semibold py-4">FAQ'S</h2>     */}
        </div>
        <div className="py-2">
            {faqData.length > 0  && faqData.map((faq, idx)=>(

                <Disclosure as="div" className="mb-2" key={idx}>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-lightbasecolor px-4 py-2 text-left text-sm font-medium text-white hover:bg-basecolor focus:outline-none focus-visible:ring focus-visible:ring-basecolor focus-visible:ring-opacity-75">
                        <span className="text-xs">{faq.question}</span>
                        <ChevronUpIcon
                        className={`${
                            open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                        />
                    </Disclosure.Button>
                    <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-800 bg-gray-100 ">
                       <p  className="text-xs" dangerouslySetInnerHTML={{ __html: faq.answer }}></p> 
                    </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            ))}
        

        
        </div>
    </>
  )
}

export default Faq