import { NextResponse } from "next/server";
export async function GET(request) {
  // const {key , txnid, amount , productinfo , firstname, phone, email, hash, surl, furl} = await request.json();
//   const data = await request.json();
  const url = new URL(request.url);
  const testValue = url.searchParams.get("test");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/HomePageService/${testValue}/`);

    // Extract JSON data from the response
    const responseData = await res.json();
    // console.log(responseData)
    return new NextResponse(JSON.stringify(responseData));
  } catch (error) {
    // console.error(error);
    return new NextResponse.Error(500, "Internal Server Error");
  }
}