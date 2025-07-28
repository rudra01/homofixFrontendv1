"use client"
import { Fragment, useState,  useContext} from 'react'
import { AuthContext } from './AuthContext'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import  { AuthServices } from './AuthServices'
// import { LogoutIcon } from '@heroicons/react/outline'
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon  } from '@heroicons/react/20/solid'

export default function Example() {
  const [showLoginpop, setShowLoginPOP] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [subMenu , setSubMenu] = useState('hidden')

  const handlesubchange = () =>{
    if(subMenu == 'hidden'){
      setSubMenu('block')
    }else{
      setSubMenu('hidden')
    }
  }
  const authContext = useContext(AuthContext)
  const userInfo = authContext.userInfo
  const handleloginshow = () => {
    console.log('inhandle fun')
    setShowLoginPOP(true);
  }

  return (
    <header className="bg-white top-0 sticky z-10 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center  justify-between py-3  lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Homofix Company</span>
            <img  src="/logodark.png" alt="homofix-logo" width={120}/>
          </a>
        </div>
        
        <div className="flex lg:hidden">
        {userInfo ? (
          <div className="relative">
          <button
          type="button" onClick={handlesubchange}
          className="flex text-sm font-semibold leading-6 text-gray-900 items-center"
        >
          <span>
            <UserCircleIcon className="w-6" />
          </span>
          <span className="">
            {/* {userInfo.username} */}
            </span>
          {/* <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" /> */}
        </button>
          <div className={`${subMenu} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            <a
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Account 
            </a>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}
            >
              <KeyIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
        ):(<button onClick={handleloginshow} className=" mr-2 rounded text-sm px-2 py-2 bg-basecolor text-white hover:bg-white hover:text-basecolor">
        Login / Sign Up
      </button>)}
        
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 mr-5" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {userInfo ? (
          <div className="relative">
          <button
          type="button" onClick={handlesubchange}
          className="flex text-sm font-semibold leading-6 text-gray-900 items-center"
        >
          <span>
            <UserCircleIcon className="w-6" />
          </span>
          <span className="ml-1">
            {/* {userInfo.username} */}
            </span>
          <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
        </button>
          <div className={`${subMenu} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
            <a
              href="/account"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Account 
            </a>
            <button
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={handleLogout}
            >
              <KeyIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
        ) : (
          <button onClick={handleloginshow}  className="flex text-sm font-semibold leading-6 text-gray-900">
          <span><UserCircleIcon className="w-6" /> </span>  Login / Sign Up <span aria-hidden="true">&rarr;</span>
          </button>
           )}
        </div> 
      </nav>
      
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="homofixcompany"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                   About Us
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Career
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Blogs
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Addons
                </a>
                <a
                  href="/contactus"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </a>
              </div>
              <div className="py-6">
                <button onClick={() => setshowLogin(true)} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
               <span><UserCircleIcon className="w-9 mr-4" /> </span>  Log in / Signup <span aria-hidden="true">&rarr;</span>
          </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* <AuthServices showLoginpop={showLoginpop} setShowLoginPOP={setShowLoginPOP} />  */}
    </header>
  )
}



//       const slugify = (text) => {
//         return text.replace(/\s+/g, "-") // Replace spaces with dashes
// // Trim dashes from the beginning and end
//       };

// Filter categories and their subcategories based on the query
        // const categoryNameMatch = cat.category_name
        //   .toLowerCase()
        //   .includes(query.toLowerCase());
        // const handleSidebarClose = () => {
  //   setShowSidebar(false);
  //   // console.log('inclosefun')
  // };

   {/* {subCategoryNames.some((subcategory) =>
                subcategory.toLowerCase().includes(query.toLowerCase())
              ) ? (
                <a href={`/category/${slugify(item.category_name)}`}>
                  {item.category_name}
                </a>
              ) : (
                <button onClick={() => handleCategoryClick(item)}>
                  {item.category_name}
                </button>
              )} */}