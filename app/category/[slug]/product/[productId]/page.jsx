import ProductDetailPage from './data';

export async function generateMetadata({ params }) {
  const baseUrl = 'https://www.homofixcompany.com';
  const decodedSlug = decodeURIComponent(params.slug);
  const encodedSlug = encodeURIComponent(decodedSlug.replace(/&/g, 'and'));
  const encodedProductId = encodeURIComponent(params.productId);
  const canonicalUrl = `${baseUrl}/category/${encodedSlug}/product/${encodedProductId}`;
  
  // You can fetch product data here to generate dynamic metadata
  const dynamicTitle = `Product Details - HomOfix Company`;
  const dynamicDescription = 'View detailed information and book our professional services';

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const ProductPage = ({ params }) => {
  return (
    <ProductDetailPage params={params} />
  );
};

export default ProductPage;