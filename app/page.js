
import Heroserc from '@/components/Heroserc'
import Partner from '@/components/Partner'
// import Whychoose from '@/components/Whychoose'
import Mostbooked from '@/components/Mostbooked'
import Exclusiveoffer from '@/components/Exclusiveoffer'
import Ourservice from '@/components/Ourservice'
import Issuesec from '@/components/Issuesec'
import Homeservice from '@/components/Homeservice'
import Sidebar from '@/components/Sidebar'
import ContentSec from '@/components/ContentSec'


export default function Home() {

  return (
    <main className="p-0 m-0">
      
      <Heroserc url={`${process.env.NEXT_PUBLIC_API_URL}/Category-Get/`} />
      <Exclusiveoffer title='Exclusive Offers' url={`${process.env.NEXT_PUBLIC_API_URL}/Offer/`}  />
      <Ourservice url={`${process.env.NEXT_PUBLIC_API_URL}/Category-Get/`} />
      < Homeservice url={`${process.env.NEXT_PUBLIC_API_URL}/HomePageService/5/`} />
      <Mostbooked url={`${process.env.NEXT_PUBLIC_API_URL}/MostViewed-Get/`} />
      < Homeservice url={`${process.env.NEXT_PUBLIC_API_URL}/HomePageService/6/`} />
      < Homeservice url={`${process.env.NEXT_PUBLIC_API_URL}/HomePageService/8/`} icenter="justify-center" />

      < Homeservice url={`${process.env.NEXT_PUBLIC_API_URL}/HomePageService/7/`} bgImg="w-full bg-[url('/ad2bg.webp')]" icenter="justify-center" />
      <Partner />
      <ContentSec />
      <Sidebar />

    </main>
  )
}
