// import RegisterExp from "./RegisterExp"
// const Partner = () => {
//   return (
//     <section className="container mx-auto mt-10">
//         <div className="grid grid-cols-2 ">
//             <div className="columns-1 flex flex-col md:justify-center align-middle text-center">
//                 <h2 className="text-xl mb-3 md:text-3xl font-semibold " >REGISTER AS A PROFESSIONAL</h2>
//                 <div className="btn">
//                   < RegisterExp />
//                 </div>
//             </div>
//             <div className="columns-1">
//                 <img src="/assets/imgs/partner.png" width={350}   alt="" />
//             </div>
//         </div>
        
//     </section>
//   )
// }

// export default Partner

import Image from "next/image"
import Link from "next/link"

export default function Partner() {
  return (
    <section className="container mx-auto mt-16 mb-16 p-2">
        <div className="bg-gradient-to-r from-basecolor to-lightbasecolor rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                <div className="text-white space-y-6">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        Become a <span className="text-yellow-400">Professional Partner</span>
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100">
                        Join thousands of skilled professionals and grow your business with HomoFix. 
                        Earn competitive rates while helping customers across the city.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/partner" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                            Register Now
                        </Link>
                        <Link href="/partner" className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image   
                        src="/assets/imgs/partner.png"  
                        width={400} 
                        height={400}
                        alt="Professional Partner" 
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    </section>
  )
}
