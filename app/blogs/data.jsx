"use client"

import Link from "next/link";
import { useEffect , useState} from "react";

const data = () => {    
    const [blogs , setBlogs] = useState([])

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/Blog/`;
    
        const fetchData = async () => {
          try {
            const response = await fetch(url, { cache: 'no-store' });
            const blogsData = await response.json();
            
            if (response) {
                setBlogs(blogsData.reverse());
                // console.log(blogsData);
              } else {
                // console.log('error-respose', response)
              }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };
    
        fetchData();
      }, []);
     
  return (
    <section className="container mx-auto max-w-[1200px] py-20">
        {/* <h1>Data</h1> */}
        <div className="grid md:grid-cols-4 gap-4 ">
            {blogs.map((blog) => 
                <div className="column-1 shadow mx-2" key={blog.id}>
               
                    <Link href={`/blogs/${slugify(blog.title)}`} >
                        <img src={blog.feature_img} alt="feature image" width="100%"  className="blogimg" />
                        <h2 className='py-5 px-2 text-center'>{blog.title}</h2>
                    </Link>
                </div>
            )}
        </div>
    </section>
  )
}
const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[^\w-]+/g, '') // Remove non-word characters except dashes
      .replace(/--+/g, '-') // Replace multiple dashes with a single dash
      .replace(/^-+|-+$/g, ''); // Trim dashes from the beginning and end
  };
export default data