
import Header from '@/components/Header'
// import Script from 'next/script';
import { AuthProvider } from '@/components/AuthContext'
import { GoogleTagManager , GoogleAnalytics } from '@next/third-parties/google'

import Googletags from '@/components/metrics/Googletags'
import MicrosoftClarity from '@/components/metrics/MicrosoftClarity'
import { Footer } from '@/components/Footer'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Scripthead from '@/components/Scripthead'
import  FooterNew  from '@/components/Footer2'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Book Professional Home Services at Your Doorstep',
  description: 'HomOfix Company provides a range of Professional Home Services by our Highly Skilled and Trusted Service Expert, Book Now for all your Home Service needs',
  alternates: {
    canonical: 'https://www.homofixcompany.com/',
  },

}


export default function RootLayout({ children }) {
 
  return (
  <>
  <html lang="en">
    {/* <googletag/> */}
     
        <AuthProvider>
            <Googletags />
            <MicrosoftClarity />
            <body className={inter.className}>
              <Header />
              {children}
              {/* <Footer /> */}
              <FooterNew />
            </body>
            <GoogleTagManager gtmId="GTM-MVVP33ZX" />
            {/* <GoogleAnalytics gaId="AW-16494970140" /> */}
            <GoogleAnalytics gaId="G-KDV329WZFW" />
        </AuthProvider>
        <Scripthead />
        
    </html>
  </>
      

  )
}
