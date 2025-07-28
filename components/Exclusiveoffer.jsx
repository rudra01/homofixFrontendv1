"use client"
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ExclusiveOffer = (props) => {
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      partialVisibilityGutter: 40,
      
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
      
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      partialVisibilityGutter: 30,
      
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
      slidesToSlide: 1,
    }
  };


  const settings = {
    slidesToShow: 3,
    infinite: true,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          speed: 500,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          dots: true,
          infinite: true,
          speed: 1000,
        }
      }
    ]
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(props.url, { cache: "no-store" });
      const data = await res.json();
      setOffer(data);
    };
    fetchData();
    setLoading(false);
  }, [props.url]);

  return (
    <section className="container mx-auto py-10 md:mt-10 ">
      <h2 className="hidden md:block text-2xl text-center font-semibold">
        {props.title}
      </h2>
      <div className="md:mt-9  md:hidden">
           {offer.length > 0 && (
              <Slider {...settings} >
                {offer.map((cat, idx) => (
                  <div key={idx} className="outline-none">
                    <Link href={cat.url} className="outline-none">
                      <img
                        src={cat.offer_pic}
                        alt="Ac"
                        width={285}
                        className="mx-auto w-11/12 md:w-11/12 outline-none"
                      />
                    </Link>
                  </div>
                ))}
              </Slider>
           ) }
      </div>
      
<div className="md:pt-10 overflow-hidden hidden md:block max-w-[1200px] mx-auto">
{offer.length > 0 && (
            <Carousel 
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-padding-bottom"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable
            >
            {loading ? <Loading /> : offer && (
            offer.map((cat, idx) => 
              <div className="className='flex justify-center p-1 " key={idx} >
                <Link href={cat.url} className=" p-0 " >
                
                <img src={cat.offer_pic}
                 width={0}
                 height={0}
                 sizes="100vw"
                 style={{ width: '100%', height: 'auto' }} 
                //  className="w-full"
                 alt='offers' />                 
                </Link>
                {/* </a> */}
              </div>

            )
            ) }
        </Carousel>
           ) }
        </div>

      
      {/* Add the CSS styling to remove outline when clicking */}
      
    </section>
  );
};

export default ExclusiveOffer;
