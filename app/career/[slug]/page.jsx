


"use client"
import Tophead from "@/components/Tophead"
// import  Data from "./data"
import {  useEffect, useState } from "react"
import JobApply from "@/components/JobApply"

import Callbox from '@/components/Callbox'
// import { initGA, logPageView } from '@/components/Analytics'

const page = ({ params }) => {
  const [jobs, setJobs] = useState([])

  useEffect(()=>{
    const GetData = async ()=>{
      console.log(params);
      if (!params || !params.slug) {
        console.error("Params or params.slug is undefined");
        console.log(params);
        return;
      }
      // console.log($(params.slug))
     const URL = `${process.env.NEXT_PUBLIC_API_URL}/Carrer-Get/${params.slug}/`;
      try {
        // Make the API call to fetch the user profile data
        const res = await fetch(URL,{cache : 'no-store'})
        if (res.ok) {
          const JobData = await res.json();
          setJobs(JobData)
          console.log('JobData', JobData)
          // console.log('jab', jobs)
        } else {
          console.error('Error fetching user profile data');
        //   router.push('/'); // Redirect to homepage if there is an error
        }
      } catch (error) {
        // Handle error case when an exception occurs during the API call
        console.error('Error fetching user profile data:', error);
        // router.push('/'); // Redirect to homepage if there is an error
      }
  }
  GetData();
  }, [])
  return (
    <>
        <Tophead slug={'Career'} />
       
        {/* <h2 className="text-3xl text-center"> <strong>{jobs.title}</strong> </h2> */}
        {jobs.title && (
           <div className="container mx-auto max-w-[1200px] my-10 px-4 md:px-0">
            <h2 className="text-3xl text-center">
              <strong>{jobs.title}</strong>
            </h2>
            <div className="p-5 jobdes w-fit mx-auto" dangerouslySetInnerHTML={{ __html: jobs.description }}></div>
            <div className="text-center">
              <JobApply JobID={jobs.id} />
            </div>
          </div>
        )}
    </>
  )
}

export default page