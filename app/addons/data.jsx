"use client"
import {  useEffect, useState } from "react"
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Loading from './loading'
const AddonPage = () => {
  const [addons, setAddons] = useState([])
  // const [message, setMessage] = useState('')
  const [cat , setCat] = useState([]);
  const [subcat , setSubCat] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    
    // console.log('loading')
    const GetData = async ()=>{
    //  const URL = `https://support.homofixcompany.com/api/Addons-GET/`
    //  const URL = `https://support.homofixcompany.com/api/SpareParts/`;
     const URL = `${process.env.NEXT_PUBLIC_API_URL}/SparePartsSubctegory/`;
     
     
      try {
        // Make the API call to fetch the user profile data
        const res = await fetch(URL,{cache : 'no-store'})
        // console.log('res', res)

        if (res.ok) {
          const JobData = await res.json();
          setAddons(JobData);
          console.log('addon', JobData)
          // console.log('jab', jobs)
        } else {
          console.error('Error fetching user profile data');
        //   router.push('/'); // Redirect to homepage if there is an error
        }
      } catch (error) {
        // Handle error case when an exception occurs during the API call
        console.error('Error fetching user profile data:', error);
        // router.push('/'); // Redirect to homepage if there is an error
      }


  }
  GetData();
  // console.log('loading finished')
  
  }, [URL])

  useEffect(()=>{
    setLoading(true);
  const CatURL = `${process.env.NEXT_PUBLIC_API_URL}/Category-Get/`;
   
    const fatchdata = async () =>{
    const res = await fetch( CatURL,{cache : 'no-store'})
    // const res = await fetch('https://support.homofixcompany.com/api/Category-Get/', { cache: "no-store" });
    
    // Extract JSON data from the response
    const responseData = await res.json();
    setSubCat(responseData);
   const newsubcat = extractSubcategories(responseData);
   setCat(newsubcat);
    // extractSubcat(responseData);
    // console.log(responseData);
    // console.log('newsubcat', newsubcat);
    // setCategory(await res.json())
    }
    fatchdata();
    setLoading(false);
  }, [])
  const extractSubcategories = (originalArray) => {
    const newArray = [];
  
    originalArray.forEach(({ subcategories, ...rest }) => {
      if (subcategories && Array.isArray(subcategories)) {
        newArray.push(...subcategories);
      }
    });
  
    return newArray;
  };
  // console.log('cat', cat)
  
  return (
    <>
    <section className="container mx-auto my-10 px-4 max-w-[1200px] md:px-0">
        <h2 className="text-3xl text-center pb-6">Spare  <strong>Parts</strong> List </h2>
        {/* <p className="text-center py-4 max-w-lg">   </p> */}
        <div className="relative overflow-x-auto  mx-auto ">
        {/* {loading && <Loading /> } */}
        {loading ? <Loading /> : cat.length  > 0  && cat.map((subcatlist, idx)=>(
                addons.some(addon => addon.product.subcategory === subcatlist.id) && (
                <Disclosure as="div" className="mb-2" key={idx}>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-lightbasecolor px-4 py-2 text-left text-sm font-medium text-white hover:bg-basecolor focus:outline-none focus-visible:ring focus-visible:ring-basecolor focus-visible:ring-opacity-75">
                        <span className="text-xs">{subcatlist.name}</span>
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
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {addons.length > 0 ? (
                              addons.map((addon, idx) => (
                                // Add a condition to check if the addon belongs to the current subcategory
                                subcatlist.id === addon.product.subcategory && (
                                  <tr key={idx} className="border-b border-gray-200 md:px-6 dark:border-gray-700">
                                    <td scope="row" className=" py-4">
                                      {addon.spare_part}
                                    </td>
                                    <td colSpan="2" className="text-right py-4">₹ {addon.price}</td>
                                  </tr>
                                )
                              ))
                            ) : (
                              <tr>
                                <td colSpan="2" className=" py-4 text-center">
                                  No addons found.
                                </td>
                              </tr>
                            )}
                        </tbody>
                    </table>
                    </Disclosure.Panel>
                    </Transition>
                </Disclosure>
                )
            ))}
        </div>
    </section>
    </>
  )
}

export default AddonPage