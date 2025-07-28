"use client"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import '../styles/Hservice.module.css';
import { useEffect , useState } from 'react';

const Mostbooked =  ({url}) => {
  const [book, setBook] = useState([]);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 640 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 640, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
      };
      useEffect(()=>{
        const fatchdata = async () =>{
          const res = await fetch( url,{cache : 'no-store'})
        // const data = 
        setBook(await res.json())
        }
        fatchdata()
      }, [url])
    
  return (
    // <section className="w-full bg-[url('/bgimg.jpg')] py-10 mt-10">
    <section className="w-full py-5 md:py-10 md:bg-gray-100 ">
    {/* // <section className="Hservice w-fullpy-10 mt-10" style="background: url('/assets/') 0% 100% no-repeat, url('') 100% 0% no-repeat;"> */}
        <h2 className=' md:text-2xl text-center font-semibold '>Most Booked</h2>
        <div className="pt-4 md:pt-10 overflow-hidden max-w-[1200px] mx-auto">
            <Carousel 
            centerMode={true} 
            responsive={responsive}
            containerClass="carousel-container"
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            removeArrowOnDeviceType={["desktop", "superLargeDesktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >

            {book.map((cat , idx) => 
             <div className='flex justify-center p-1 md:p-10' key={idx}>
             <Link href={`/category/${slugify(cat.subcategory_name)}`} className=" p-0 " >
             <img src={cat.img}
                 width={0}
                 height={0}
                 sizes="100vw"
                 style={{ width: '100%', height: 'auto' }} alt='mostviewd' />
             <h2 className='text-center p-2'>{cat.subcategory_name}</h2>
             </Link>
            </div>

            )} 
        </Carousel>
        </div>
    </section >
  )
}
const slugify = (text) => {
  if (typeof text !== 'string') {
    return '';
  }
  return text.replace(/\s+/g, "-");
};
export default Mostbooked