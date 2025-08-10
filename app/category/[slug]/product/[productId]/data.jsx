'use client'

import React, { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from 'next/navigation';
import { TagIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import { AuthContext } from '@/components/AuthContext'
import { CheckIcon } from '@heroicons/react/20/solid'
import { AuthServices } from '@/components/AuthServices'
import { Booking } from '@/components/Booking'
import Faq from '@/components/Faq'
import Loading from '@/components/Loading'

const ProductDetailPage = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [subCat, setSubCat] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [gstCustShare, setCustShare] = useState('');
  const [coupon, setCoupon] = useState('');
  const [couponId, setCouponId] = useState('');
  const [couponmsg, setCouponMsg] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartVisible, setCartVisible] = useState(true);
  const cartRef = useRef(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext && authContext.userInfo) {
      setUserInfo(authContext.userInfo);
    }
  }, [authContext]);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch subcategory data to get products
        const suburl = `/api/subcat/?cat=${slugify(params.slug)}`;
        const res = await fetch(suburl);
        const subcat = await res.json();
        setSubCat(subcat);

        // Find the specific product
        if (subcat.products) {
          const foundProduct = subcat.products.find(p => p.id.toString() === params.productId);
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug, params.productId]);

  useEffect(() => {
    const fetchshare = async () => {
      const res2 = await fetch('/api/percentage');
      const res = await res2.json();
      setCustShare(res[0].percentage);
    };
    fetchshare();
  }, []);

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
  };

  const handleVerificationCoupon = async () => {
    try {
      const cupurl = `/api/coupon/?code=${coupon}`;
      const response = await fetch(cupurl);
      const result = await response.json();

      if (response) {
        if (result.message) {
          setCouponMsg(result.message);
          setDiscount('');
        } else {
          const couponAmount = result.discount_amount;
          const totalCartAmount = getTotalAmount();

          if (couponAmount * 2 > totalCartAmount) {
            setCouponMsg('Please add more services to apply this coupon.');
            setDiscount('');
            setCouponId('');
          } else {
            setDiscount(couponAmount);
            setCouponId(result.id);
            setCouponMsg(`Congrats! You've unlocked up to Rs ${couponAmount} off`);
          }
        }
      } else {
        setCouponMsg('Failed to send coupon. Please try again.');
      }
    } catch (error) {
      setCouponMsg('catch Failed to send coupon. Please try again.');
    }
  };

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems];
    const existingProduct = updatedCartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
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
    const couponAmount = discount;
    if (couponAmount && couponAmount * 2 > totalCartAmount) {
      setCouponMsg('Please add more services to apply this coupon.');
      setDiscount('');
      setCouponId('');
    }
  };

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.quantity * item.selling_price;
    });
    return total;
  };

  const getNetAmount = () => {
    let netamount = getTotalAmount() - discount;
    return netamount;
  };

  const getGSTAmount = () => {
    let amount = getNetAmount();
    let comp_share = amount * (gstCustShare / 100);
    let comp_tax = comp_share * (18 / 100);
    let emp_share = amount - comp_share;
    let emp_tax = emp_share * (5 / 100);
    let gst = emp_tax + comp_tax;
    return gst;
  };

  const slugify = (text) => {
    return text.replace(/-/g, ' ');
  };

  if (loading || !product) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto py-10 max-w-[1200px] px-4 md:px-4">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-basecolor hover:text-bgleft transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back 
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Product Details Section */}
        <div className="space-y-6 md:col-span-2">
          {/* Product Image */}
          <div className=" flex justify-between">
            <div>
            

            <h1 className="font-bold text-xl md:text-3xl">{product.name}</h1>

            <div className="py-2">
              <span className="pr-2 font-bold text-basecolor text-xl">
                ₹{product.selling_price}
              </span>
              {product.price !== product.selling_price && (
                <span className="line-through text-gray-500 ">
                  ₹{product.price}
                </span>
              )}
            </div>

            {product.dis_amt !== 0 && (
              <div className="flex font-bold text-red-600">
                <TagIcon className="w-[20px] text-red" />
                ₹{product.dis_amt} OFF
              </div>
            )}
            {product.warranty > 0 && (
              <h5 className="text-basecolor font-bold my-2 text-sm">
                {product.warranty} DAYS WARRANTY
              </h5>
            )}



            {/* Add to Cart Button */}
          <div className="border-t pt-6">
            <div className="flex justify-start">
              {cartItems.find(item => item.id === product.id) ? (
                <div className="flex items-center bg-gray-100 rounded-lg p-2">
                  <button
                    className="bg-white text-basecolor font-bold p-2 px-4 text-lg rounded"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    -
                  </button>
                  <span className="mx-4 font-semibold text-lg">
                    {cartItems.find(item => item.id === product.id).quantity}
                  </span>
                  <button
                    className="bg-white text-basecolor font-bold p-2 px-4 text-lg rounded"
                    onClick={() => handleAddToCart(product)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-basecolor text-white text-xs font-bold py-3 px-8 rounded-lg hover:bg-bgleft transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
            </div>
            <img
              src={product.product_pic}
              alt={product.name}
              className="w-[150px] h-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            {/* {product.warranty > 0 && (
              <h5 className="text-basecolor font-bold text-sm">
                {product.warranty} DAYS WARRANTY
              </h5>
            )}

            <h1 className="font-bold text-2xl md:text-3xl">{product.name}</h1>

            <div className="py-2">
              <span className="pr-2 font-bold text-basecolor text-xl">
                ₹{product.selling_price}
              </span>
              {product.price !== product.selling_price && (
                <span className="line-through text-gray-500">
                  ₹{product.price}
                </span>
              )}
            </div>

            {product.dis_amt !== 0 && (
              <div className="flex font-bold text-red-600">
                <TagIcon className="w-[20px] text-red-600" />
                ₹{product.dis_amt} OFF
              </div>
            )} */}

            {/* Product Description */}
            {/* <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <div
                className="productpoints text-md text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div> */}

            {/* Warranty Description */}
            {product.warranty_desc && (
              <div className="border-t pt-4">
                {/* <h3 className="font-semibold text-lg mb-3">Warranty Details</h3> */}
                <div
                  className="moredetailsviews text-md text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.warranty_desc }}
                />
              </div>
            )}
          </div>

          
        </div>
       
        {/* Cart and Booking Section */}
        <div className="space-y-6 ">
          {/* Order Summary */}
          {cartItems.length > 0 ? (
            <div className="bg-gray-50 p-6 rounded-lg" ref={cartRef} id='cart'  >
              <h3 className="font-bold text-xl py-3 text-basecolor">Order Summary</h3>
              <hr className="mb-4" />

              <table className="table-auto w-full">
                <tbody className="font-semibold space-y-4">
                  <tr>
                    <td className="text-left font-medium text-basecolor">Subtotal</td>
                    <td className="text-right">₹ {getTotalAmount()}</td>
                  </tr>

                  {discount && (
                    <>
                      <tr>
                        <td className="text-left font-medium text-red-600">Coupon Discount</td>
                        <td className="text-right text-red-600">- ₹ {discount}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <hr className="w-full pb-2" />
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left font-medium">Net Amount</td>
                        <td className="text-right">₹ {getNetAmount()}</td>
                      </tr>
                    </>
                  )}

                  <tr>
                    <td className="text-left">
                      <span className="font-medium text-basecolor">Tax & Fee</span>
                    </td>
                    <td className="text-right">₹ {getGSTAmount().toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <hr className="w-full pb-2" />
                    </td>
                  </tr>

                  <tr>
                    <th className="text-left font-medium text-basecolor">Total Amount</th>
                    <th className="text-right text-basecolor">
                      ₹ {getNetAmount() + Number(getGSTAmount().toFixed(2))}
                    </th>
                  </tr>
                </tbody>
              </table>

              {/* Booking Button */}
              <div className="mt-6">
                {userInfo ? (
                  <Booking
                    cnames="text-white bg-gradient-to-r from-bgleft to-bgleft font-bold w-full py-3 px-4 rounded-lg"
                    title="Book Now"
                    cartItems={cartItems.map(item => ({
                      product: item.id,
                      productName: item.name,
                      quantity: item.quantity,
                    }))}
                    subcategoryID={subCat}
                    customer={userInfo.id}
                    couponID={couponId}
                    PaymentAmount={getNetAmount() + Number(getGSTAmount().toFixed(2))}
                  />
                ) : (
                  <AuthServices
                    cnames="text-white bg-gradient-to-r from-bgleft to-bgleft font-bold w-full py-3 px-4 rounded-lg"
                    title="Login/Sign up to Proceed"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className='my-6 py-6  text-center bg-gray-50 p-6 rounded-lg'>
                <img src="/empty-cart.png" alt="empty-cart" width={100} className='mx-auto my-9' />
                <p className='text-2xl font-bold'>Your Cart is Empty</p>
                <p className='text-sm font-light pt-2'>Looks like you haven’t added anything to your cart. Go ahead and explore our top services. </p>
            </div>
          )}

          {/* Coupon Section */}
          {cartItems.length > 0 && (
            <div className="bg-white border rounded-lg p-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Have a Coupon Code ?"
                  className="text-sm w-full border rounded-l-lg px-3 py-2"
                  onChange={handleCouponChange}
                />
                <button
                  className="bg-basecolor p-2 px-4 text-white rounded-r-lg"
                  onClick={handleVerificationCoupon}
                >
                  <CheckIcon className="w-6" />
                </button>
              </div>
              {couponmsg && <p className="text-red-600 mt-2 text-sm">{couponmsg}</p>}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-2">
        <Faq ProID={product.id} />
      </div>

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
      {/* Legal Pages */}
      {subCat.legal_pages && subCat?.legal_pages?.length > 0 && (
        <div className="py-6 w-full p-2 mt-8 border-t">
          <div
            className="productpoints text-md"
            dangerouslySetInnerHTML={{ __html: subCat.legal_pages[0].content }}
          />
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;