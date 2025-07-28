// export async function POST(request) {
//   // const data = {
//   //   'key': Mkey,
//   //         'txnid' : 'test101',
//   //         'amount': 100.0,
//   //         'productinfo': 'testing',
//   //         'firstname': 'vikas',
//   //         'phone': '8989898989',
//   //         'email': 'vikasgupta282@gmail.com',
//   //         'hash': 'b1ee3658d3f5caab82d1e9abcafa5143df6c89ce5ba3c8db55a1c2b0f3dca6ed668e89bc4a57f65f4598f00107a2c031f63bde90e55e2b496286dd1cdea1477e',
//   //         'surl': 'https://homofixcompany.com/about',
//   //         'furl': 'https://homofixcompany.com/about'
//   // }
//   // const res = await fetch('https://testpay.easebuzz.in/payment/initiateLink', {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //       },
//   //       body: JSON.stringify(data),
//   //     });

//   return new Response(JSON.stringify(request.body));
// } 
import { NextResponse } from "next/server";
export async function POST(request) {
  // const {key , txnid, amount , productinfo , firstname, phone, email, hash, surl, furl} = await request.json();
  const data = await request.json();

  // Convert data to 'application/x-www-form-urlencoded' format
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
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
        console.log(responseData)
        return new NextResponse(JSON.stringify(responseData));
      } catch (error) {
        console.error(error);
        return new NextResponse.Error(500, "Internal Server Error");
      }
}
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   // return NextResponse.json({"message": "cool"});
//   const data = await request.json();

//   // Convert data to 'application/x-www-form-urlencoded' format
//   const formData = new URLSearchParams();
//   for (const key in data) {
//     formData.append(key, data[key]);
//   }

//   try {
//     const res = await fetch('https://testpay.easebuzz.in/payment/initiateLink', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formData.toString(),
//     });

//     // Extract JSON data from the response
//     const responseData = await res.json();

//     return new NextResponse.JSON(responseData);
//   } catch (error) {
//     console.error(error);
//     return new NextResponse.Error(500, "Internal Server Error");
//   }
// }



// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { key, txnid, amount, productinfo, firstname, phone, email, hash, surl, furl } = await request.json();

//     // You can now use the extracted data as needed

//     return new Response(JSON.stringify({'mesage': 'testing'}));
//   } catch (error) {
//     console.error(error);
//     return new NextResponse.Error(500, "Internal Server Error");
//   }
// }