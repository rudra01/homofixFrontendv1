'use client'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link";
import { useState , useEffect } from "react";
import Loading from "./Loading";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Didact_Gothic } from "next/font/google";


const Homeservice = ({url , bgImg=null, icenter=null}) => {
  const [serv, setServ] = useState([])
  const [sub, setSub] = useState([])
  const [loading, setLoading] = useState(false);
  // const [sliderRef] = useKeenSlider({
  //   breakpoints: {
  //     "(min-width: 400px)": {
  //       slides: { perView: 2, spacing: 5 },
  //     },
  //     "(min-width: 1000px)": {
  //       slides: { perView: 4, spacing: 10 },
  //     },
  //   },  
  //   slides: { perView: 2 , spacing: 10},
  // })
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 40
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
      slidesToSlide: 1
    }
  };
useEffect(() => {
  setLoading(true);
  const fetchData = async () => {
    const res = await fetch(url, { cache: "no-store" })
    const service = await res.json()
    // console.log(service)
    setServ(service)
    const subser = service.subcategory
    // console.log(subser)

    setSub(subser)
    setLoading(false);
    // Process the fetched data here
  };

  fetchData();
}, [url]);
// const service = await res.json()
const slugify = (text) => {
  return text
    .replace(/\s+/g, "-") // Replace spaces with dashes
// Trim dashes from the beginning and end
};
  return (
    <section className={bgImg}>
    <div className="container max-w-[1200px] mx-auto py-5 md:py-10 md:mt-10 pt-4 md:border-none border-t-4 border-b-4 border-t-gray-300 border-b-gray-300">
        <h2 className='md:text-2xl text-center font-semibold'>{serv.title}</h2>
        <div className=" md:mt-9">
         
          <div className="pt-4 md:pt-10 overflow-hidden">
            <Carousel 
            centerMode={true} 
            responsive={responsive}
            containerClass="carousel-container"
            keyBoardControl={true}
            customTransition="all .1 ease in out"
            transitionDuration={500}
            additionalTransfrom={0}
            draggable={true}
            // removeArrowOnDeviceType={["desktop", "superLargeDesktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className={icenter}
            >
            {loading ? <Loading /> : sub && (
            sub.map((cat, idx) => 
              <div className="className='flex justify-center p-1 " key={idx} >
                <Link href={`/category/${slugify(cat.name)}`} className=" p-0 " >
                {/* <a href={`/category/${slugify(cat.name)}`} className=" p-0 "> */}
                <img src={cat.subcategory_image}
                //  width={0}
                //  height={0}
                //  sizes="100vw"
                //  style={{ width: '100%', height: 'auto' }} 
                className="w-full"
                 alt='mostviewd' />
                  {/* <img src={cat.subcategory_image} alt="Ac" width={285} className='mx-auto min-w-[250px]'  /> */}
                  <h2 className='py-4 text-center text-sm md:text-base' >{cat.name}</h2>
                </Link>
                {/* </a> */}
              </div>

            )
            ) }
        </Carousel>
        </div>

        </div>
        
    </div>
  </section>
  )
}

export default Homeservice

