// import { useRouter } from 'next/router';

import Link from 'next/link'
const Tophead = ({slug}) => {
    
  return (
    <section className="bg-[url('/headerbg.jpg')] bg-bottom bg-no-repeat bg-cover text-white">
        <div className="container mx-auto py-20 flex flex-col justify-center max-w-[1200px]  md:justify-between md:flex-row">
            <h2 className='text-3xl text-center pb-4  md:text-left md:pb-0'>{slug}</h2>
            <div className="slug text-center md:text-right " >
               <Link href={'/'}>
               Home
               </Link>
               <span> / {slug}</span>
            </div>
        </div>
        
    </section>
  )
}

export default Tophead