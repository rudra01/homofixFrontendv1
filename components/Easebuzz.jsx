'use client'
import crypto from 'crypto';
import { useState } from 'react';
const easebuzz = ({userID,name , phone ,pro , Amount}) =>{
  const [easebuzzkey , easebuzzsalt] = ['WJE5UAJ51D', 'Y3LVJ15S3M'];
  // const [access_key , setAccess_key] = useState('');
    const URL = '/api/test';
    
    
    const HashDatafind = ()=>{
        const uniqueID = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const concatenatedString = `${easebuzzkey}|bookingID${pro.product}_${uniqueID}|${Amount}|${pro.productName}|${name}|info@homofixcompnay.com|||||||||||${easebuzzsalt}`;
        // Generate the hash using SHA-256
        const hash = crypto.createHash('sha512').update(concatenatedString).digest('hex');
        ////console.log('Generated Hash:', hash);

        const pData = {
            'key': easebuzzkey,
            'txnid' : `bookingID${pro.product}_${uniqueID}`,
            'amount': Amount,
            'productinfo': pro.productName,
            'firstname': name,
            'phone': phone,
            'email': 'info@homofixcompnay.com',
            'hash': hash,
            'surl': 'https://homofixcompany.com/account',
            'furl': 'https://homofixcompany.com/account',
        };
        ////console.log('pdata', pData)
        return pData;
    }
    const handleOnlinePayment2 = async () => {
        const SendData = HashDatafind();
        let access_key = '';
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(SendData),
              });
            const data = await response.json();
            //console.log(data);
            // setAccess_key(data.data);
            access_key = data.data;
            // //console.log(access_key);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        //console.log('testing here');
        // //console.log(SendData);

        const easebuzzCheckout = new EasebuzzCheckout(easebuzzkey, 'prod');
        const options = {
          access_key: access_key, // access key received via Initiate Payment
          onResponse: (response) => {
              //console.log(response);
              if(response.status == 'success'){
                //console.log('pay has been successfully done yo yo ');
              }
          },
          theme: "#123456" // color hex
        }
      easebuzzCheckout.initiatePayment(options);
        
    }
  return (
    <>
        {/* <button className="mt-5 bg-basecolor text-white"onClick={() => setBookingShow()} > Click Here -- </button> */}
        <button className='mt-5 bg-basecolor text-white py-2 px-9 mx-auto '
                      onClick={() => {
                        // makePayment({ productId: "example_ebook" });
                        handleOnlinePayment2()
                      }}
                    >
                      Pay Now
                    </button>
    </>
  )
}

export default easebuzz