import {
    PhoneIcon,
    // FaUserCircle,
  } from '@heroicons/react/24/solid'

const Callbox = () => {
  return (
    <section className="py-20 text-center text-white bg-gradient-to-r from-bgleft to-bgright"> 
        <h2 className=" text-2xl md:text-4xl ">We're big on trust & safety.</h2>
        <p className="py-3 text-sm md:text-base">Taskers go through an extensive vetting process before they can join our community:</p>

        <div className="py-5 text-4xl text-center flex justify-center align-middle">
            <div className="icons w-10 mr-2">
            <PhoneIcon className='w-8 md:w-fit' /> 
            </div>
            <a href="tel:+918130105760" className='text-xl md:text-2xl' >+91-813-0105-760</a>
           
        </div>
    </section>
  )
}

export default Callbox