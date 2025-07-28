import Link from "next/link"

export default function ThankyouPage() {
  return (
    <>
    <div className="my-6 mb-6 flow-root items-center justify-center text-center px-2 pb-9">
          <img src="/cracker.png" alt="congrats" width={120} className='mx-auto mt-16' />
            <h2 className='text-3xl text-basecolor font-bold py-3'>Thank You!!</h2>
                <p className='text-sm text-gray-800 mb-6'>You have successfully booked our services </p>
                {/* <ul className='list-none'>
                    <li className='py-3 font-semibold text-lg'>Booking Date:Time - </li>
                </ul> */}
                <Link href='/account' className='px-4 py-2 bg-basecolor text-white mt-5'> Go to Account</Link>
    </div>
    </>
  )
}
