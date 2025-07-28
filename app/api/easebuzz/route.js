
import { NextResponse } from "next/server";
export async function POST(request) {
  // const {key , txnid, amount , productinfo , firstname, phone, email, hash, surl, furl} = await request.json();
  const data = await request.json();

  // Convert data to 'application/x-www-form-urlencoded' format
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  // console.log(formData);
  try {
        const res = await fetch('https://pay.easebuzz.in/payment/initiateLink', {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });
    
        // Extract JSON data from the response
        const responseData = await res.json();
        
        // console.log(responseData)
        return new NextResponse(JSON.stringify(responseData));
      } catch (error) {
        // console.error(error);
        return new NextResponse.Error(500, "Internal Server Error");
      }
}
