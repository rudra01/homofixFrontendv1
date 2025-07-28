"use client"
import styles from "../styles/Sidebar.module.css";
import {
  ArrowLeftIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  // FaUserCircle,
} from '@heroicons/react/24/outline'
import Link from "next/link";
import { useState } from "react";

const Sidebar = ({show, subcategories, onClose }) => {
    // const [side , setSide] = useState(show)
    
    const handleClick = () => {
        // setSide(false); 
        onClose();// Set side to false to hide the sidebar when the button is clicked
      };
      const slugify = (text) => {
        return text
          .replace(/\s+/g, "-") // Replace spaces with dashes
// Trim dashes from the beginning and end
      };
  return (
    <>
    {show && ( // Only render the sidebar if `side` is true
        <div className={`${styles.sidebar} w-full md:w-3/12 z-[1500]`}>
          {/* <button  className=""> */}
            <div onClick={handleClick} className="w-full py-4 flex justify-start px-5 border-b-2 cursor-pointer">
              <ArrowLeftIcon className="w-7 mr-5" /> Please Select
            </div>
           {subcategories.map((sub,idx)=>
            <a  href={`/category/${slugify(sub.name)}`} className="w-full flex justify-start border-b-2 py-3 pl-4 align-middle hover:bg-indigo-200 " key={idx}>
            <img src={sub.subcategory_image} width={40} className="mr-2" alt="" /> 
            <h2 className="pt-2 font-semibold">{sub.name}</h2> 
            </a>
            
           
           )}
        </div>
      )}
    </>
  )
}

export default Sidebar