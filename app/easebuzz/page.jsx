'use client'
import crypto from 'crypto';
function easebuzz() {
   
    const URL = '/api/test';
    
    
    const HashDatafind = ()=>{
        const concatenatedString = `WJE5UAJ51D|test105|100.21|testing|vikas|vikasgupta282@gmail.com|||||||||||Y3LVJ15S3M`;
        // Generate the hash using SHA-256
        const hash = crypto.createHash('sha512').update(concatenatedString).digest('hex');
        console.log('Generated Hash:', hash);

        const pData = {
            'key': 'WJE5UAJ51D',
            'txnid' : 'test105',
            'amount': 100.21,
            'productinfo': 'testing',
            'firstname': 'vikas',
            'phone': '8989898989',
            'email': 'vikasgupta282@gmail.com',
            'hash': hash,
            'surl': 'https://homofixcompany.com/about',
            'furl': 'https://homofixcompany.com/about',
        };
        return pData;
    }
    // const concatenatedString = `WJE5UAJ51D|test101|100.0|testing|vikas|vikasgupta282@gmail.com|||||||||||Y3LVJ15S3M`;
    // // Generate the hash using SHA-256
    // const hash = crypto.createHash('sha512').update(concatenatedString).digest('hex');
    // console.log('Generated Hash:', hash);
    const setBookingShow = async () => {
        const SendData = HashDatafind();
        


        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(SendData),
              });
            const data = await response.json();
            console.log(data);
           
          } catch (error) {
            console.error("An error occurred:", error);
          }
        console.log('testing here');
        console.log(SendData);
        
    }
  return (
    <>
        <button className="mt-5 bg-basecolor text-white"onClick={() => setBookingShow()} > Click Here -- </button>
       
    </>
  )
}

export default easebuzz