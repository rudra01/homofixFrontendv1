import { NextResponse } from "next/server";
export async function GET(request) {
    const url = new URL(request.url);
    const coupon = url.searchParams.get("code");
try {
    const res = await fetch('https://support.homofixcompany.com/check-coupon-validity/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code : coupon}),
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