"use client"
import { useState, useCallback, useRef } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function PartnerPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mno, setMno] = useState('');
  const [exType, setExType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [address, setAddress] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleBlank = useCallback(() => {
    setName('');
    setEmail('');
    setMno('');
    setExType('');
    setAddress('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleSendformData = useCallback(() => {
    if (name !== '' && mno !== '' && exType !== '' && address !== '') {
      const applyData = new FormData();
      applyData.append('name', name);
      if (email) {
        applyData.append('email', email);
      }
      applyData.append('mobile', mno);
      applyData.append('expert_in', exType);
      applyData.append('full_address', address);
      if (selectedFile) {
        if (selectedFile.type !== 'application/pdf') {
          setErrorMsg('Resume file must be in PDF format');
          return;
        }
        applyData.append('resume', selectedFile);
      }

      const postjob = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_URL}/JobEnquiry/`;
        try {
          const response = await fetch(URL, {
            method: "POST",
            body: applyData,
          });

          if (response.ok) {
            const FeedbackData = await response.json();
            setSuccessMsg('Form Has Been Submitted Successfully!');
            setErrorMsg('');
            handleBlank();
            setTimeout(() => setIsFormVisible(false), 2000);
          } else {
            console.error("Request failed with status:", response.status);
            setErrorMsg('Submission failed. Please try again.');
          }
        } catch (error) {
          console.error("An error occurred:", error);
          setErrorMsg('An error occurred. Please try again.');
        }
      };
      postjob();
    } else {
      setErrorMsg('Please fill all the mandatory fields');
    }
  }, [exType, address, mno, name, selectedFile, email, handleBlank]);

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Earnings",
      description: "Earn attractive commissions on every service completed"
    },
    {
      icon: "📱",
      title: "Easy Mobile App",
      description: "Manage your bookings and earnings through our user-friendly app"
    },
    {
      icon: "🎯",
      title: "Flexible Schedule",
      description: "Work according to your availability and preferred time slots"
    },
    {
      icon: "🛠️",
      title: "Skill Development",
      description: "Access to training programs and skill enhancement workshops"
    },
    {
      icon: "🤝",
      title: "Reliable Support",
      description: "24/7 customer support to help you with any queries"
    },
    {
      icon: "⭐",
      title: "Build Reputation",
      description: "Build your professional reputation with customer reviews"
    }
  ];

  const expertiseAreas = [
    "Plumbing", "Electrical", "AC Repair", "Appliance Repair", 
    "Carpentry", "Painting", "Cleaning", "Pest Control",
    "Home Renovation", "Gardening", "Interior Design", "Others"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-basecolor to-lightbasecolor text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 md:gap-12 items-center ">
                         <div className="order-2 bg-white rounded-2xl mt-5 md:mt-0 p-6 shadow-xl">
               {/* <h3 className="text-2xl font-bold text-gray-800 mb-6">Register as Professional</h3> */}
               
               {successMsg && (
                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                   <CheckIcon className="w-5 h-5 mr-2" />
                   {successMsg}
                 </div>
               )}
               {errorMsg && (
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                   {errorMsg}
                 </div>
               )}
               
               <div className="grid md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Full Name *
                   </label>
                   <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter your full name"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Mobile Number *
                   </label>
                   <input
                     type="tel"
                     value={mno}
                     onChange={(e) => setMno(e.target.value)}
                     className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter your mobile number"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Email Address (Optional)
                   </label>
                   <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="Enter your email"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Expertise Type *
                   </label>
                   <select
                     value={exType}
                     onChange={(e) => setExType(e.target.value)}
                     className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   >
                     <option value="">Select your expertise</option>
                     {expertiseAreas.map((area, index) => (
                       <option key={index} value={area}>{area}</option>
                     ))}
                   </select>
                 </div>
               </div>
               
               <div className="mt-4">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Full Address *
                 </label>
                 <textarea
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                   rows="3"
                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="Enter your complete address"
                 ></textarea>
               </div>
               
               <div className="mt-4">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Resume (Optional - PDF only)
                 </label>
                 <input
                   type="file"
                   ref={fileInputRef}
                   onChange={(e) => setSelectedFile(e.target.files[0])}
                   accept=".pdf"
                   className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
               </div>
               
               <button
                 onClick={handleSendformData}
                 className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300"
               >
                 Submit Application
               </button>
             </div>
            <div className="space-y-6 order-1 ">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Become a 
                <span className="text-yellow-400"> Professional Partner</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                Join thousands of skilled professionals earning with HomoFix. 
                Grow your business and reach more customers.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsFormVisible(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Register Now
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Learn More
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a platform that values your skills and helps you build a successful business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Register</h3>
              <p className="text-gray-600">
                Fill out our simple registration form with your details and expertise
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Verified</h3>
              <p className="text-gray-600">
                Our team will verify your credentials and approve your profile
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Start Earning</h3>
              <p className="text-gray-600">
                Receive bookings and start providing services to customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already transformed their careers with HomoFix
          </p>
          <button 
            onClick={() => setIsFormVisible(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-12 py-4 rounded-lg font-semibold text-xl transition-all duration-300 transform hover:scale-105"
          >
            Register as Professional
          </button>
        </div>
      </section>

      {/* Registration Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">Register as Professional</h3>
                <button 
                  onClick={() => setIsFormVisible(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {successMsg && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {errorMsg}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={mno}
                    onChange={(e) => setMno(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise Type *
                  </label>
                  <select
                    value={exType}
                    onChange={(e) => setExType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your expertise</option>
                    {expertiseAreas.map((area, index) => (
                      <option key={index} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your complete address"
                ></textarea>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume (Optional - PDF only)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleSendformData}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}