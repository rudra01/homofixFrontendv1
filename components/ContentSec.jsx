'use client'
import React, { useEffect, useState } from 'react'

const ContentSec = () => {
        const [pages , setPages] = useState([]);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/Legal-Page-Get/`;   
    useEffect(()=>{
                const featch = async() =>{
                    const res = await fetch( url,{cache : 'no-store'});
                    const data = await res.json()
                   const updatedata = data.slice(2);
                   console.log("homepage data - ", updatedata )
                   const filteredData = updatedata.filter(item => 
                    item.subcategory === null && 
                    item.home === true && 
                    item.contact === false
                );
                console.log("homepage data filteredData - ", filteredData )

                    setPages(filteredData)
                }
                featch()
            } , [url])

  return (
    <>
    {pages.length > 0 && (
      <>
      <section className="container mx-auto mt-10">
        <div className='my-5 py-2 w-full p-2'>
            {/* <h2 className='text-2xl font-bold'>{subCat.legal_pages[0].title}</h2> */}
            <div className='productpoints'  dangerouslySetInnerHTML={{ __html: pages[0].content }} style={{ fontSize: '14px' }}></div>
        </div>
      </section>
      </>
    )}
    </>
  )
}

export default ContentSec