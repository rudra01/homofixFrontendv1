'use client'
// import Styles from '../../../styles/Product.module.css';
// import Link from "next/link"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,  Fragment , useContext, useRef } from "react";
// import { useEffect , useState , Fragment , useContext, useRef} from "react"
import { Dialog, Transition } from '@headlessui/react'
import { TagIcon,   XMarkIcon} from '@heroicons/react/20/solid'
// import { AuthContext } from './AuthContext'
import { AuthContext } from '@/components/AuthContext'
import { CheckIcon } from '@heroicons/react/20/solid'
import {AuthServices} from '@/components/AuthServices'
import {Booking} from '@/components/Booking2'
import Faq from '@/components/Faq'
import Loading from '@/components/Loading'

const DataPage = ({params}) => {


  let [isOpenVDetails, setIsOpenVDetails] = useState(false)
const [subCat , setSubCat] = useState({})
const [userInfo , setUserInfo] = useState(null)
const [selectedProduct, setSelectedProduct] = useState(null);
const [cartItems, setCartItems] = useState([]);
const [gstCustShare, setCustShare] = useState('');
const [coupon , setCoupon] = useState('')
const [couponId , setCouponId] = useState('')
const [couponmsg , setCouponMsg] = useState('')
const [discount , setDiscount] = useState('')
const [loading, setLoading] = useState(false);
const [cartVisible, setCartVisible] = useState(true);
const cartRef = useRef(null);


useEffect(() => {
  const options = {
    rootMargin: '0px',
    threshold: 0,
  };

//console.log('trigger in the useeffect')
  const observer = new IntersectionObserver(([entry]) => {
    setCartVisible(!entry.isIntersecting);
    //console.log('Intersection Observer Triggered');
  }, options);

  const target = cartRef.current;

  //console.log(target);
  if (target) {
    observer.observe(target);
  }

  // Cleanup the observer
  return () => {
    //console.log("in return fun = ". target);
    if (target) {
      observer.unobserve(target); 
    //console.log('in Return fun');

    }
  };
}, [cartItems]);

const authContext = useContext(AuthContext)
// const userInfo = authContext.userInfo
// console.log('userInfo', userInfo)

useEffect(() => {
  // console.log('test ');
  if (authContext && authContext.userInfo) {
    // Access userInfo here
    // const userInfo = authContext.userInfo
    setUserInfo(authContext.userInfo)
    
  }
}, [authContext]);

const handleCouponChange = (event) => {
  setCoupon(event.target.value);
  };
  // console.log('userInfo', userInfo)
const handleVerificationCoupon = async () => {
 
    try {
      const cupurl = `/api/coupon/?code=${coupon}`;
      const response = await fetch(cupurl)
      const result = await response.json();

      if (response) {
        //console.log('Response:', result);
        if(result.message){
          setCouponMsg(result.message)
          setDiscount('')
        }else{
          // setDiscount(result.discount_amount)
          // setCouponId(result.id)
          // //console.log("rsid",result.id)
          // setCouponMsg(`Congrats! You've unlocked up to Rs ${result.discount_amount} off`)
          const couponAmount = result.discount_amount;

    // Check if the coupon amount is valid (e.g., double the total cart amount)
          const totalCartAmount = getTotalAmount();

          if (couponAmount * 2 > totalCartAmount) {
            // Handle the case where the condition is not met
            //console.log('Please add more servies to apply this coupon');
            setCouponMsg('Please add more servies to apply this coupon.');
            setDiscount('');
            setCouponId('');
          } else {
            setDiscount(couponAmount);
            setCouponId(result.id);
            //console.log("rsid", result.id);
            setCouponMsg(`Congrats! You've unlocked up to Rs ${couponAmount} off`);
          }
        }
        
        
      } else {
        setCouponMsg('Failed to send coupon. Please try again.');
      }
    } catch (error) {
      //console.log(error);
      setCouponMsg('catch Failed to send coupon. Please try again.');
    }
  
}

    useEffect(()=>{
        const fetchshare = async () => {
            const res2 = await fetch('/api/percentage')
            // const res2 = await fetch('https://support.homofixcompany.com/api/Company-percentage/')
            const res = await res2.json();
            setCustShare(res[0].percentage)
        }
        fetchshare();
        //console.log('gstCustShare' , gstCustShare)
        //console.log('userifo' , userInfo)
        
    } , [])
    useEffect(()=>{
      //console.log('params.slug' , params.slug)
      //console.log('params' , params)
      setLoading(true);
        const fetchData = async () => {
            const suburl = `/api/subcat/?cat=${slugify(params.slug)}`;
            // const res = await fetch(`https://support.homofixcompany.com/api/Subcategory-Get/${slugify(params.slug)}/`);
            const res = await fetch(suburl);
            const subcat = await res.json();
            console.log( 'subcat', subcat)
            setSubCat(subcat)
        }
        fetchData()
      setLoading(false);

    }, [])
  
    // //console.log('ussubcat' , subCat)
    if (Object.keys(subCat).length === 0) {
        // Render loading state or return null if desired
        return <Loading />;
      }
      const handleAddToCart = (product) => {
        const updatedCartItems = [...cartItems];
        const existingProduct = updatedCartItems.find(item => item.id === product.id);
    
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          updatedCartItems.push({...product, quantity: 1});
        }
    
        setCartItems(updatedCartItems);
      };
    
      const handleRemoveFromCart = (product) => {
        const updatedCartItems = [...cartItems];
        const existingProduct = updatedCartItems.find(item => item.id === product.id);
    
        if (existingProduct) {
          existingProduct.quantity -= 1;
    
          if (existingProduct.quantity <= 0) {
            const index = updatedCartItems.indexOf(existingProduct);
            updatedCartItems.splice(index, 1);
          }
        }
    
        setCartItems(updatedCartItems);

        // Recalculate the total amount of the cart
      const totalCartAmount = getTotalAmount();

      // Check if the coupon amount is still valid
      const couponAmount = discount;
      if (couponAmount && couponAmount * 2 > totalCartAmount) {
        // Handle the case where the condition is not met
        //console.log('Please add more services to apply this coupon');
        setCouponMsg('Please add more services to apply this coupon.');
        setDiscount('');
        setCouponId('');
      } else {
        setCartItems(updatedCartItems);
      }
      };
    const getTotalAmount = () => {
        let total = 0;
    
        cartItems.forEach(item => {
          total += item.quantity * item.selling_price;
        });
        // setTotalAmount(total)
        return total;
      };
    const getNetAmount = () => {
      let netamount = getTotalAmount() - discount
      // setNetAmount(netamount)
      return netamount
    }
      // setNetAmount(getTotalAmount())
      const getGSTAmount = () => {
        let amount = getNetAmount();
        // let amount = netamount;
        let comp_share = amount * (gstCustShare/100)
        let comp_tax = comp_share * (18/100)
        let emp_share = amount - comp_share 
        let emp_tax = emp_share * (5/100)
        let gst = emp_tax + comp_tax
        return gst;
      };
      function handleView(product) {
        // ...
        setSelectedProduct(product)
        setIsOpenVDetails(true)
      }
      // //console.log( 'selected pros',selectedProduct)
  return (
    <section className="container mx-auto py-10 max-w-[1200px]">

    
    <div className="bg-gradient-to-r from-bgleft to-Orange text-center py-8" >
        <h1 className="text-3xl font-bold text-white">{subCat.name}</h1>
        {/* <img src={subCat.subcategory_image} alt={subCat.Category_name} width={250} /> */}
    </div>
    <div className="grid md:grid-cols-3 gap-3 py-12">
        {/* <div></div> */}
        <div className="md:col-span-2 p-4 md:px-16">
             {/* Render subcategories */}
             {loading ? <Loading /> : subCat.products && (
            <>
      {subCat.products.map((product) => (
        <div className="my-6 border-b-2 py-4" key={product.id}>
            <div className="flex justify-between">
                <div className="content w-full"> 
                   
                    <h2 className="font-bold md:text-xl w-full">{product.name}</h2> 
                    <div className="py-2">
                        <span className='pr-2 font-bold text-basecolor'> ₹{product.selling_price}</span>
                        {/* <span className='line-through'> ₹{product.price}</span> */}
                        {product.price !== product.selling_price && (
                          <span className="line-through"> ₹{product.price}</span>
                        )}
                    </div>
                    {/* <div className=" flex font-bold">
                       <TagIcon className='w-[20px] text-red' /> ₹{product.dis_amt} OFF
                    </div> */}
                    {product.dis_amt !== 0 && (
                      <div className="flex font-bold">
                        <TagIcon className="w-[20px] text-red" /> ₹{product.dis_amt} OFF
                      </div>
                    )}
                    <div className="p-2">
                        <button className='text-basecolor text-sm' onClick={()=>handleView(product)}>View Details</button>
                        <hr className='pb-3' />
                    <div className='productpoints'  dangerouslySetInnerHTML={{ __html: product.description }} style={{ fontSize: '12px' }}></div>

                    </div>
                </div>
                <div className=" text-center">
                    <img src={product.product_pic} className='min-w-[100px] md:min-w-[170px]' width={170} alt="" />
                    <div className="btnbox border w-fit mx-auto text-center mt-2">
                    {cartItems.find(item => item.id === product.id) ? (
                      <div className="flex items-center bg-white justify-center">
                        <button
                          className="addbutton bg-white text-basecolor font-bold p-2 px-4 text-sm"
                          onClick={() => handleRemoveFromCart(product)}
                        >
                          -
                        </button>
                        <span className="mx-2 font-sm bg-white text-black ">
                          {cartItems.find(item => item.id === product.id).quantity}
                        </span>
                        <button
                          className="addbutton bg-white text-basecolor font-bold p-2 px-4  text-sm "
                          onClick={() => handleAddToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="addbutton bg-white text-basecolor font-bold py-2 px-9  text-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add
                      </button>
                    )}
                   </div>
                </div>
            </div>
            
            
           
        </div>
      ))}
    </>
  )}

  {/* Include the rest of the content */}
        </div>
    <div >
      
      {cartItems.length > 0 && (
        <div>
          {cartVisible && (
            <div className='fixed bottom-0 left-0 w-full bg-white z-50 px-4 shadow-sm py-6 flex justify-between md:hidden'>
          <span>
          ₹  {getNetAmount() + Number(getGSTAmount().toFixed(2)) } 
          </span>
          <a href='#cart' className='bg-basecolor px-4 py-2 text-white text-xs'>View Cart</a>
        </div>
          )}
        
        </div>
      )}
    <div ref={cartRef} id='cart' className=" p-4 bg-gray-50 " >
    {cartItems.length > 0 ? (
        <div >
        <h3 className='font-bold text-xl py-3 text-basecolor'>Order Summary</h3>
        <hr />
        <div className='p-4'>
        
        <table className="table-auto w-full">
       
            <tbody className='font-semibold space-y-4'>
           
            <tr >
              <td className='text-left font-medium text-basecolor'>Subtotal </td>
              <td className='text-right'>₹ {getTotalAmount()}</td>
            </tr>
              {discount && (
                <>
                <tr >
                  <td className='text-left font-medium text-red'>Coupon Discount </td>
                  <td className='text-right text-red'>- ₹ {discount}</td>
                </tr>
                
                <tr >
              <td  >
                <hr className='w-full pb-2 ' />
              </td>
              <td  >
                <hr className='w-full  pb-2' />
              </td>
            </tr>
                <tr >
                  <td className='text-left font-medium '>Net Amount </td>
                  <td className='text-right'>
                  ₹ { getNetAmount()}
                  </td>
                </tr>
                </>
                
              )}

            <tr>
              
                <td className='text-left'>
                    <span className='font-medium text-basecolor'> Tax & Fee </span>
                   </td>
                <td className='text-right'> ₹ {getGSTAmount().toFixed(2) }</td>
            </tr>
                <tr >
              <td  >
                <hr className='w-full pb-2 ' />
              </td>
              <td  >
                <hr className='w-full  pb-2' />
              </td>
            </tr>

            <tr>
            <th className='text-left font-medium text-basecolor'>Total Amount </th>
              <th className='text-right text-basecolor'>₹  {getNetAmount() + Number(getGSTAmount().toFixed(2)) }  </th>
            </tr>
            </tbody>
           
      </table>
      {/* <button className='bg-basecolor w-full py-2 px-4 mt-9 text-white'>Proceed </button> */}
      {userInfo ? ( 
         
          <Booking cnames={'text-white bg-gradient-to-r from-bgleft to-bgleft font-bold w-full py-2 px-4 mt-9'} title='Book Now' cartItems={cartItems.map(item => ({
            product: item.id,
            productName: item.name,
            quantity: item.quantity,
            // subcategory: subCat.Category_id
          }))} subcategoryID={subCat} customer={userInfo.id} couponID={couponId} PaymentAmount={getNetAmount() + Number(getGSTAmount().toFixed(2))} />
         ):(
          <>
       
        <AuthServices cnames={'text-white bg-gradient-to-r from-bgleft to-bgleft font-bold w-full py-2 px-4 mt-9'} title='Login/Sign up to Proceed' />
        
      </>
         )}
      
      </div>
      </div>
    ) : (
      <div className='my-6 py-6  text-center'>
        <img src="/empty-cart.png" alt="empty-cart" width={100} className='mx-auto my-9' />
        <p className='text-2xl font-bold'>Your Cart is Empty</p>
        <p className='text-sm font-light pt-2'>Looks like you haven’t added anything to your cart. Go ahead and explore our top services. </p>
      </div>
    )}
  </div>
  {cartItems.length > 0 && (<div className="cupsec">
    <div className="flex justify-center px-4 py-4 mt-6">
        <input type="text" placeholder='Have a Coupon Code ?' className='text-sm w-full' onChange={handleCouponChange} />
        <button className='bg-basecolor p-2 px-4 text-white'><CheckIcon className='w-6 p-0 mx-auto' onClick={handleVerificationCoupon} /></button>
    </div>
    <p className='text-red px-2'>{couponmsg}</p>
  </div>)
  }
  
  
  </div>
    </div>
    <Transition.Root show={isOpenVDetails} as={Fragment} enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
        <Dialog
            open={isOpenVDetails}
            onClose={() => setIsOpenVDetails(false)}
            className="relative z-[1500]"
            >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 overflow-y-auto">
                {/* Container to center the panel */}
                <div className="flex min-h-full items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="mx-auto max-w-5xl rounded bg-white p-2 md:p-6">
                    <div className="flex justify-between mb-9">
                    <Dialog.Title></Dialog.Title>
                    <XMarkIcon onClick={() => setIsOpenVDetails(false)} className='w-9 cursor-pointer' />
                    </div>
                <Dialog.Description>
                {selectedProduct && (
                    <>
                    <div className="title flex justify-around">
                        <div className="">
                        {/* <h3 className="text-lg font-semibold mb-2 pr-10">{selectedProduct.name}</h3> */}
                        {selectedProduct.warranty > 0 ? (
                          <h5 className='text-basecolor font-bold text-sm'>{selectedProduct.warranty} DAYS WARRANTY</h5>
                        ):(
                          <h5></h5>
                        )}
                        
                        <h2 className="font-bold md:text-xl w-full">{selectedProduct.name}</h2> 
                        <div className="py-2">
                            <span className='pr-2 font-bold text-basecolor'> ₹{selectedProduct.selling_price}</span>
                            {/* <span className='line-through'> ₹{selectedProduct.price}</span> */}
                            {selectedProduct.price !== selectedProduct.selling_price && (
                                <span className="line-through"> ₹{selectedProduct.price}</span>
                        )}
                        </div>
                        {selectedProduct.dis_amt !== 0 && (
                        <div className=" flex font-bold">
                            <TagIcon className='w-[20px] text-red' /> ₹{selectedProduct.dis_amt} OFF
                        </div>
                        )}
                        </div>
                    <img src={selectedProduct.product_pic} className='min-w-[170px] ' width={170} alt="" />
                    </div>
                    {/* <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></div> */}
                    <div dangerouslySetInnerHTML={{ __html: selectedProduct.warranty_desc }} className='py-9 moredetailsviews text-sm'></div>

                    <Faq  ProID={selectedProduct.id} />
                    {/* Other details */}
                    </>
                )}
                  
                </Dialog.Description>
                {/*
                You can render additional buttons to dismiss your dialog by setting
                `isOpen` to `false`.
                */}
                {/* <button onClick={() => setIsOpenVDetails(false)}>Cancel</button>
                <button onClick={handleDeactivate}>Deactivate</button> */}
            </Dialog.Panel>
                </div>
            </div>
            </Dialog>
    </Transition.Root>


    {subCat.legal_pages.length>0 && (
      <>
      <div className='py-2 w-full p-2'>
        {/* <h2 className='text-2xl font-bold'>{subCat.legal_pages[0].title}</h2> */}
        <div className='productpoints'  dangerouslySetInnerHTML={{ __html: subCat.legal_pages[0].content }} style={{ fontSize: '12px' }}></div>
      </div>
     
      </>
    )}
  </section>
  )
}
const slugify = (text) => {
  return text.replace(/-/g, ' ');
};

export default DataPage