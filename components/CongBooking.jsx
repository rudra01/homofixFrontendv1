import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CongBooking = ({stateview}) => {
  const [congBookingShow, setCongBookingShow] = useState(true);
useEffect(()=>{
    setCongBookingShow(true)
}, [])
  return (
    <>
        <Dialog as="div" open={congBookingShow} onClose={() => setCongBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-[1500]" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-[1500] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-lg sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between border-b-2 pb-3">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Homofix Company</span>
              {/* <h2 className="text-xl font-semibold">Booking</h2> */}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setCongBookingShow(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="my-6 flow-root">
                <h2>Congratulation</h2>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default CongBooking