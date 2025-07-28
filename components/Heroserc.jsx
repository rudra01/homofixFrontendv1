"use client"
import {CiSearch } from 'react-icons/ci'
import {CiLocationOn } from 'react-icons/ci'
import { Combobox } from '@headlessui/react'
import { useState ,useEffect } from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'


const Heroserc = ({url}) => {
  const [selectedcat, setSelectedcat] = useState('');
  const [query, setQuery] = useState('');
  const [cats, setCats] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(()=>{
    const fatchdata = async () =>{
    const res = await fetch( url,{cache : 'no-store'})
    const data = await res.json()
    // console.log( 'cat', data)
    setCats(data)
      // const categoryNames = data.map((cat) => cat.category_name);
      const subcategories = data.reduce(
        (acc, cat) => [...acc, ...cat.subcategories],
        []
      );
      const subcatNames = subcategories.map((sub)=> sub.name)
      setSubcategories(subcategories);
      setSelectedcat(subcategories[0]?.name || 'Search for Ac Repair');
    }
    fatchdata()
  }, [url])

  const filteredService = query === ''
    ? subcategories // Display all subcategories when there's no query
    : subcategories.filter((subcategory) =>
        subcategory.name.toLowerCase().includes(query.toLowerCase())
      );

    

  return (
    <>
    <div className="bg-basecolor md:bg-[url('/bgnew.jpg')] md:py-6 py-8 md:h-96 bg-bottom flex flex-col justify-center bg-no-repeat  md:bg-cover">
        <h1 className='hidden md:block text-center text-4xl text-Orange font-semibold '>Expert Home Services, On Your Demands</h1>
        <p className=' hidden md:block text-center pt-4 text-xl text-white'>Your Home, Our Priority</p>
    </div>
    <div className="flex justify-center -mt-8">
      <div className="relative w-full px-6 md:px-0 md:w-7/12 ">
      <Combobox value={selectedcat} onChange={setSelectedcat}>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search For AC Service"
              className="border-transparent form-input border-gray-200 placeholder-gray-400 contrast-more:border-gray-400 contrast-more:placeholder-gray-500 rounded-2xl pl-9 p-8 py-3 md:py-4 drop-shadow-md w-full text-sm md:text-md text-gray-700"
            />
            <CiSearch className="absolute top-[14px] md:top-[18px] left-[32px] md:left-[7px] text-[20px] text-gray-700" />
            <Combobox.Options className="bg-white shadow-md p-2 border-2 rounded pt-10 -mt-8 list-none">
              {filteredService.map((subcategory, idx) => (
                <Combobox.Option key={idx} value={subcategory} cla>
                    <a className='text-sm hover:text-basecolor' href={`/category/${slugify(subcategory.name)}`}>{subcategory.name}</a>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
      </div>
        
    </div>
    </>
    
  )
}

const slugify = (text) => {
  return text.replace(/\s+/g, '-');
};
export default Heroserc