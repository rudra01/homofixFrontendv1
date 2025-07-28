"use client"
import { useEffect, useState } from "react";
import { initGA, logPageView } from '@/components/Analytics'

const BlogPage = ({ params }) => {
  const [blog, setBlog] = useState(null); // Set initial state to null
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  
  useEffect(() => {
    setIsLoading(true); 
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Blog/${slugify(params.slug)}/`, { cache: 'no-store' });
        const blogsData = await res.json();

        if (res.ok) {
          setBlog(blogsData);
          // console.log('Blogs:', blogsData)
        } else {
          // console.log('Error response:', res);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchData();
    initGA(); // Initialize Google Analytics
    logPageView();
    
  }, []);


  if (isLoading || !blog) {
    return null; // Return a loading state if the blog data is still being fetched or not available
  }

  return (
    <>
      <main>
        {/* <div className="bg-[url('/herobg.svg')] bg-bottom bg-no-repeat bg-cover text-center text-white py-20">
          <h2 className="text-3xl font-bold py-4 md:py-9">{blog.title}</h2>-mt-10 
        </div> */}
        <div className="container mx-auto max-w-[1200px] pb-20 p-4">
          <div className="img mx-auto pb-5">
          {/* <div className="img max-w-[350px] md:max-w-[550px]  mx-auto"> */}
            <img src={blog.feature_img} alt="feature image" width="100%"  />
          </div>
          <h1 className="md:text-4xl text-center font-bold py-4  text-2xl">{blog.title}</h1>

          <div className="py-5 mb-6" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      </main>
    </>
  );
};

const slugify = (text) => {
  return text.replace(/-/g, " ");
};

export default BlogPage;
