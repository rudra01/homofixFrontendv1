"use client"
import Tophead from "@/components/Tophead"
import  Data from "./data"
import { useEffect } from 'react';

import Callbox from '@/components/Callbox'
// import { initGA, logPageView } from '@/components/Analytics'

const page = () => {
  // useEffect(() => {
  //   initGA(); // Initialize Google Analytics
  //   logPageView();
  // }, []);
  return (
    <>
        <Tophead slug={'Career'} />
        <Data />
        {/* <Callbox /> */}
    </>
  )
}

export default page