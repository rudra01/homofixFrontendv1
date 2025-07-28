'use client'
import Script from "next/script"
const MicrosoftClarity = () =>{
  return (
    <>
        <Script
            id="microsoft-clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "lgxt601tn5");
                `,
            }}
        />
        <Script 
        id="google-analytics-call-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={`
        gtag('config', 'AW-16494970140/EFQLCKq4w6AZEJyKtbk9', {
          'phone_conversion_number': '8130105760'
        });
      `}
        />
    </>
  )
}
export default MicrosoftClarity