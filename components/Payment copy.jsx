import Script from "next/script";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from "next/link";
const Payment = ({amount , name , mobile , bookingID}) => {
    const [congBookingShow, setCongBookingShow] = useState(false);
    
    const handleOnlinePayment = async() => {
        const apiKey = 'rzp_test_C8XkYZBi6Tpn1G';
        const apiSecret = 'izRT1cAew7L1lfmQfbelyJZs';
        let localbookindID = '';
        const authToken = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    
        const valord = {
        amount: amount * 100,
        currency: 'INR',
        receipt: 'rep_001',
        };
    
        const data = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Basic ${authToken}`,
        },
        body: JSON.stringify(valord),
        }).then((t) => t.json());
    
              const handlePaymentRep = (paymentID)=>{
                const authToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;  
                // url = 'https://support.homofixcompany.com/api/customer/payments/'
                // console.log('PayID' , paymentID)
                // console.log('bookingID' , localbookindID)
                // console.log('PaymentAmount' , PaymentAmount)
                let rept = {
                    "payment_id": paymentID,
                    "payment_mode": 'Online',
                    "amount": amount,
                    "booking_id": bookingID,
                }
                const postResp = async () => {
                    try {
                      const response = await fetch('https://support.homofixcompany.com/api/customer/payments/', {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${authToken}`,
                        },
                        body: JSON.stringify(rept),
                      });
                  
                      if (response.ok) {
                        const data = await response.json();
                        // console.log(data);

                      } else {
                        console.error("Request failed with status:", response.status);
                      }
                    } catch (error) {
                      console.error("An error occurred:", error);
                    }
                  }
                  postResp()
            }
    
            //   console.log('data', data);
            const razorpayOptions = {
                key: apiKey, // Replace with your Razorpay key ID
                amount: amount * 100, // Replace with the actual amount to be charged
                currency: 'INR', // Replace with the appropriate currency code
                name: 'Homofix Company', // Replace with your company name
                description: 'Home Service', // Replace with the payment description
                order_id: data.id, // Replace with your unique order ID
                handler: (response) => {
                  // Payment successful, perform necessary actions
                  // console.log('Payment successful:', response)
                  handlePaymentRep(response.razorpay_payment_id)
                  setCongBookingShow(true)
                },
                prefill: {
                  name: name, // Replace with the customer's name
                  contact: mobile, // Replace with the customer's phone number
                },
                theme: {
                  color: '#F37254', // Replace with your desired color theme
                },
              };
    
        if (typeof window !== 'undefined' && window.Razorpay) {
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            razorpayInstance.open();
            } else {
            console.error('Razorpay script is not loaded.');
            }
            // handlePaymentRep()
        }
        // const handleCongsmsg = () =>{
        //     setCongBookingShow(true)
        // }
  return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        
            <button className=' bg-basecolor text-white rounded text-sm py-2 px-3'
                onClick={() => {
                handleOnlinePayment()
                }}
            >
                Pay: ₹ {amount}
            </button>

        <Dialog as="div" open={congBookingShow} onClose={() => setCongBookingShow(false)}>
        {/* Dialog content */}
        <div className="fixed inset-0 z-50" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 justify-center flex items-center sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between border-b-2 pb-3">
          </div>
          <div className="my-6 flex flex-col items-center justify-center ">
            <img src="/Group.png" alt="congs" width={180} className="mt-3" />
                <h2 className="font-bold text-basecolor text-2xl mt-4 text-center">Congratulation Payment has been done</h2>
                <Link href="http://localhost:3000/account" className="bg-basecolor text-white px-4 py-2 mt-6 mx-auto">
                  Return</Link>
          </div>
        </Dialog.Panel>
      </Dialog>
        </>
  )
}

export default Payment