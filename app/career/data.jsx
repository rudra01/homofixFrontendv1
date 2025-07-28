"use client"
import {  useEffect, useState } from "react"
import JobApply from "@/components/JobApply"
import JobDescription from "./JobDescription"
const CarrerPage = () => {
  const [jobs, setJobs] = useState([])
  // const [message, setMessage] = useState('')
  // const [joboverData, setJobOverData] = useState([]);
  useEffect(()=>{
    
    const GetData = async ()=>{
     const URL = `${process.env.NEXT_PUBLIC_API_URL}/Carrer-Get/`
      try {
        // Make the API call to fetch the user profile data
        const res = await fetch(URL,{cache : 'no-store'})
        // console.log('res', res)

        if (res.ok) {
          const JobData = await res.json();
          setJobs(JobData.reverse())
          // console.log('JobData', JobData)
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
  }, [URL])

  // const jobOverview = jobs[0]?.description.match(/<strong>Job Overview:<\/strong>(.*?)<p>&nbsp;<\/p>/s);
  return (
    <>
    <section className="container mx-auto max-w-[1200px] my-10 px-4 md:px-0">
        <h2 className="text-3xl text-center">Explore <strong> Exciting Opportunities </strong> at HomOfix Company!</h2>
        <p className="text-center py-5 mb-9 md:px-9 ">We're thrilled to announce a new job opening at HomOfix Company, and we invite talented individuals like you to join our dynamic team. Take the next step in your career by applying for this fantastic opportunity. </p>

        {jobs.map((job) => 
                <div className="p-4 py-8 shadow-2xl mt-5 text-center" key={job.id}>
                  {/* <h2 className="text-xl font-semibold py-3">{job.title}</h2>
                  <div className="p-5 jobdes w-fit mx-auto" dangerouslySetInnerHTML={{ __html: job.description }}></div>
                  <div className="text-center">
                    <JobApply JobID={job.id} />
                  </div> */}
                  <div className="flex">
                    <img src="/job-offers.webp" alt="job offer" width={140} />
                    <div className="px-3 text-left"> 
                      <h2 className="text-xl font-semibold pt-4 mb-4">{job.title}</h2>
                      {/* <div className="py-2 w-fit" dangerouslySetInnerHTML={{ __html: job.description.match(/<strong>Job Overview:<\/strong>(.*?)<p>&nbsp;<\/p>/s)[0] }}></div> */}
                      {/* {job.description.match(/<strong>Job Overview:<\/strong>(.*?)<p>&nbsp;<\/p>/s) !== null ? (
                  <div className="py-2 w-fit" dangerouslySetInnerHTML={{ __html: job.description.match(/<strong>Job Overview:<\/strong>(.*?)<p>&nbsp;<\/p>/s)[0] }}></div>
                ) : null} */}
                 {/* <JobDescription content={jobs.description.match(/<strong>Job Overview:<\/strong>([\s\S]*?)<\/p>/)?.[0]} /> */}
                 {/* <JobDescription content={job.description} /> */}
                      <a href={`/career/${job.id}`} className="text-sm bg-black text-white px-4 py-2 mt-4">View More</a>
                    </div>
                    
                  </div>
                </div>
            )}
    
    </section>
    </>
  )
}

export default CarrerPage