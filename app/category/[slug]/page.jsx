
import DataPage from './data';
import { useRouter } from 'next/navigation';


// Use async to fetch data dynamically or manipulate the params
export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.homofixcompany.com';
  const decodedSlug = decodeURIComponent(params.slug);
  const encodedSlug = encodeURIComponent(decodedSlug.replace(/&/g, 'and'));
  const canonicalUrl = `${baseUrl}/category/${encodedSlug}`;
  // Extract params to create a dynamic title and description
  const { slug } = params; // Assuming the param is called 'slug', adjust based on your URL structure
  // const router = useRouter()
  // const currentUrl = `${window.location.href}`;
  let dynamicTitle = `${slug}`; // Fallback title
  let dynamicDescription = ``; // Fallback description

  // Customize the title and description based on the category or params
  switch (decodedSlug) {
    case 'AC-Repair-and-Service':
      dynamicTitle = 'Book AC Repair & Service in Delhi NCR, Kanpur';
      dynamicDescription = 'Book AC Service, AC Repair, AC Installation and Gas Leakage Repair & Refill services by our Highly Skilled and Trusted Service Expert in Delhi NCR and Kanpur. Book Now!';
      break;
    case 'Washing-Machine-Repair':
      dynamicTitle = 'Get Best Washing Machine Repair at your Doorstep';
      dynamicDescription = 'Book Washing Machine Repair service by our Highly Skilled and Trusted Service Expert in Delhi NCR and Kanpur';
      break;
    case 'Refrigerator-Repair':
      dynamicTitle = 'Repair your Refrigerator by our Highly Skilled Expert';
      dynamicDescription = 'Book Single Door Fridge and Double Door Fridge Repair Service by our Highly Skilled and 100% Verified Service Expert in Delhi NCR and Kanpur';
      break;
    case 'Geyser-Repair':
      dynamicTitle = 'Get Best Geyser Repair Service by our Experienced Expert';
      dynamicDescription = 'Book Geyser Repair, Geyser Service, Geyser Installation Service by our Highly Skilled and Verified Service Expert in Delhi NCR and Kanpur. Book Now';
      break;
    case 'Television-Repair':
      dynamicTitle = 'Book Best Television Repair Service in Delhi NCR';
      dynamicDescription = 'Book best LCD, LED, TV, Smart TV repair Service by our Highly Skilled and Verified Service Expert in Delhi NCR and Kanpur. Book Now';
      break;
    case 'Microwave-Repair':
      dynamicTitle = 'Best Microwave Repair Service in Delhi NCR.';
      dynamicDescription = 'Looking for Expert Microwave Repair in Delhi NCR or Kanpur? We offer Best Microwave Repair services at your doorstep by our Highly skilled Technical Expert.';
      break;
    case 'Chimney-Repair':
      dynamicTitle = 'Expert Chimney Repair Services in Delhi NCR & Kanpur | Fast & Reliable';
      dynamicDescription = 'Need Professional Chimney Repair Service in Delhi NCR or Kanpur? We Deliver quality Chimney Repair Service at your Home by our Highly skilled Chimney Expert.';
      break;
    case 'Water-Purifier-Repair':
      dynamicTitle = 'Professional Water Purifier Service in Delhi NCR & Kanpur';
      dynamicDescription = 'Ensure Clean and Safe Drinking Water with Our Water Purifier Service Expert in Delhi NCR and Kanpur. We provide High Quality Spare Parts to maintain the purity.';
      break;
    case 'Bathroom-Cleaning':
      dynamicTitle = 'Premium Bathroom Cleaning by Highly Skilled Cleaning Expert';
      dynamicDescription = 'Keep your Bathroom spotless & stainless with our Deep Bathroom Cleaning Service in Delhi NCR and Kanpur, by our Highly Skilled and 100% Verified Cleaning Expert';
      break;
    case 'Kitchen-Cleaning':
      dynamicTitle = 'Professional Kitchen Cleaning Service in Delhi NCR & Kanpur';
      dynamicDescription = 'Remove Oil & Grease Stain with our Deep Kitchen Cleaning Service by our Highly Skilled and 100% Verified Cleaning Expert in Delhi NCR and Kanpur. Book Now!';
      break;
    case 'Sofa-Cleaning':
      dynamicTitle = 'Best & Premium Sofa Cleaning Service in Delhi NCR & Kanpur';
      dynamicDescription = 'Refresh your sofa with Professional Sofa Cleaning Services in Delhi NCR and Kanpur. We offer Premium Sofa Cleaning, Carpet Cleaning, Mattress Cleaning and more';
      break;
    case 'Full-Home-Cleaning':
      dynamicTitle = 'Get Best Professional Home Cleaning Service at your Doorstep';
      dynamicDescription = 'Get your Home Spotless & stainless with our Premium Home Cleaning Service by our Highly Skilled and Experienced Cleaning Expert in Delhi NCR and Kanpur';
      break;
    case 'Bungalow-Cleaning':
      dynamicTitle = 'Professional Bungalow Cleaning Service at your Doorstep';
      dynamicDescription = 'Ensure your Villa stays Spotless & Stainless with our Professional Villa Cleaning Services in Delhi NCR and Kanpur. We offer Bungalow cleaning & villa cleaning';
      break;
    default:
      dynamicTitle = `HomOfix Company `;
      dynamicDescription = 'HomOfix Company provides AC & Appliances Repair | Cleaning | Home Painting | Plumber | Electrician | Carpenter Services';
      break;
  }
  

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


const SubcategoryPage = ({ params } ) => {

  return (
    <DataPage params={params} />
  )
  
}
const slugify = (text) => {
  return text.replace(/-/g, ' ');
};


export default SubcategoryPage;