'use client'

import Sidebar from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import Loading from './Loading';

const Service = ({url}) => {
  const[category , setCategory] = useState([])
  const [showSidebar, setShowSidebar] = useState(false);
  const[selectedCategory , setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    const fatchdata = async () =>{
    const res = await fetch( url,{cache : 'no-store'})
    // const res = await fetch('https://support.homofixcompany.com/api/Category-Get/', { cache: "no-store" });
    
    // Extract JSON data from the response
    // const responseData = await res.json();
    setCategory(await res.json())
    }
    fatchdata()
    setLoading(false);
  }, [url])
  // console.log( 'categories' , category)
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    
    // console.log( 'cat = ', category)
    setShowSidebar(true);
  };
  const handleSidebarClose = () => {
    setShowSidebar(false);
    // console.log('inclosefun')
  };

  return (
    <div className="w-full bg-[url('/ad2bg.webp')]">
    <section className="container md:max-w-[760px] mx-auto md:py-10 md:mt-10 pt-4 md:border-none border-t-4 border-t-gray-300 ">
        <h2 className=' md:text-2xl text-center font-semibold'>Explore Our Services</h2>
        <div className="servicesarea  pt-10 md:py-12 grid grid-cols-3 gap-3 p-2">
        {/* {data.map((cat) => <h1 key={cat.id}>{cat.category_name}</h1>)} */}
        {loading ? <Loading /> : category.map((cat, idx) => (
        <div className='text-center' key={idx}>
          <button onClick={() => handleCategoryClick(cat)}>
            <img src={cat.icon} alt="Ac" width={45} className='mx-auto w-10 md:w-15' />
            <h2 className='py-4 text-[10px] md:text-sm'>{cat.category_name}</h2>
          </button>
        </div>
      ))}
        
        </div>
        {selectedCategory && (
        <Sidebar
          show={showSidebar} // Set show to true to always show the sidebar when a category is selected
          subcategories={selectedCategory.subcategories}
          onClose={handleSidebarClose}
        />
      )}
    </section>
    </div>
  )
}

export default Service