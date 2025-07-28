"use client"

import Tophead from "@/components/Tophead"
import  Data from "./data"
import { useEffect } from 'react';

import Callbox from '@/components/Callbox'


const page = () => {

  return (
    <>
        <Tophead slug={'Addon-Services'} />
        <Data />
        {/* <Callbox /> */}
    </>
  )
}

export default page