"use client"
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";

// const animation = { duration: 5000, easing: (t) => t }
const ExclusiveOffer = (props) => {
  const [offer, setOffer] = useState([]);
  const [sliderRef, slider] = useKeenSlider({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
        loop: true,
        
        // created(s) {
        //   s.moveToIdx(5, true, animation)
        // },
        // updated(s) {
        //   s.moveToIdx(s.track.details.abs + 5, true, animation)
        // },
        // animationEnded(s) {
        //   s.moveToIdx(s.track.details.abs + 5, true, animation)
        // },
      },
      "(min-width: 700px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
    slides: { perView: 1 },
    loop: true, // Enable looping
     
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(props.url, { cache: "no-store" });
      const data = await res.json();
      setOffer(data);
    };
    fetchData();
  }, [props.url]);

  // Wait for offer data to be fetched before initializing the slider
  useEffect(() => {
    if (sliderRef && !slider) {
      sliderRef.current && sliderRef.current.refresh();
    }
    
  }, [sliderRef, slider]);

  return (
    <section className="container mx-auto py-10 md:mt-10">
      <h2 className="hidden md:block text-2xl text-center font-semibold">
        {props.title}
      </h2>
      <div className="md:mt-9 overflow-hidden outline-none">
        {offer.length > 0 && sliderRef && (
          <div ref={sliderRef} className="keen-slider outline-none">
            {offer.map((cat, idx) => (
              <div className="keen-slider__slide outline-none" key={idx}>
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
          </div>
        )}
      </div>
      {/* Add the CSS styling to hide navigation arrows */}
      <style jsx>{`
        .slick-arrow {
          display: none!important;
        }
      `}</style>
    </section>
  );
};

export default ExclusiveOffer;
