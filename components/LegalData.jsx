"use client"
import { useState, useEffect } from "react";
// import styles from '../styles/Product.module.css'
const data =  ({url}) => {    
    const [ldata, setLdata] = useState('')
//     const navigation = useNavigation();

//   if (navigation.isFallback) {
//     return <div>Loading...</div>;
//   }
useEffect(()=>{
    const featch = async() =>{
        const res = await fetch( url,{cache : 'no-store'});
        const terms = await res.json()
        // console.log("terms", terms )
        setLdata(terms)
    }
    featch()
} , [url])
    // console.log( 'ldata', ldata)
     
  return (
    <section className="container mx-auto max-w-[1200px] py-10">
        {/* <h1>Data</h1> */}
        <div className="py-4 px-2 ">
            <div  dangerouslySetInnerHTML={{ __html: ldata.content }}></div>
        </div>
    </section>
  )
}

export default data