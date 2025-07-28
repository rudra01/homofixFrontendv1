"use client"
// import Link from "next/link"
import { useState, useEffect } from "react";
// import PageData from "./data";
import { useRouter } from "next/navigation";
import Tophead from "@/components/Tophead"
import LegalData from "@/components/LegalData"
export default function CustomPages({ params }) {
    const [pageData, setPageData] = useState(null);
    const router = useRouter();
    const currentSlug = params.slug  ;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/Legal-Page-Get/`;
    useEffect(()=>{
        const featch = async() =>{
            const res = await fetch( url,{cache : 'no-store'});
            const data = await res.json()
           const updatedata = data.slice(2);
          //  console.log("res updatedata - ", updatedata )
          // Find the matching item
          const matchingPage = updatedata.find(item => {
            // Convert the title to lowercase and replace spaces with hyphens for comparison
            const itemSlug = item.title.toLowerCase().replace(/\s+/g, '-');
            return itemSlug === currentSlug;
          });

          if (matchingPage) {
            setPageData(matchingPage);
            // console.log("Found matching page:", matchingPage);
          } else {
            // console.log("No matching page found");
            // Redirect to 404 page if no matching page is found
            router.push('/404'); // If you have a custom 404 page
            // OR
            router.push('/not-found'); // If your 404 page is named differently
            // OR for built-in 404
            router.replace('/404');
          }
            // setPages(updatedata)
        }
        featch()
    } , [url])

  return (
    <>
    {pageData && (
      <>
        <Tophead slug={slugify(currentSlug)} />
        <LegalData url={`${process.env.NEXT_PUBLIC_API_URL}/Legal-Page-Get/${pageData.id}/`} />
      </>
    )}
     
     
    </>
  )
}


const slugify = (text) => {
  // First remove hyphens and convert to spaces
  const withSpaces = text.replace(/-/g, " ");
  
  // Capitalize first letter of each word
  return withSpaces
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};