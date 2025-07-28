// import Link from 'next/link'
"use client"
import Tophead from '@/components/Tophead'
import About from './about'

import Whychoose from '@/components/Whychoose'


const about = () => {
  
  return (
    <>
    <Tophead slug={'About'} />
    <About />
    <Whychoose />
    {/* <Callbox /> */}
    </>
    
  )
}

export default about