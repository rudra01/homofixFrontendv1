"use client"
import Tophead from "@/components/Tophead"
import LegalData from "@/components/LegalData"
import Callbox from '@/components/Callbox'

function privacy() {
  return (
    <>
    <Tophead slug={'Privacy Policy'} />
    <LegalData url={`${process.env.NEXT_PUBLIC_API_URL}/Legal-Page-Get/1/`} />
    {/* <Callbox /> */}
</>
  )
}

export default privacy  