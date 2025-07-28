
const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace('-', /\s+/g ) // Replace spaces with dashes
      .replace('', /[^\w-]+/g) // Remove non-word characters except dashes
      .replace( '-', /--+/g) // Replace multiple dashes with a single dash
      .replace('', /^-+|-+$/g); // Trim dashes from the beginning and end
  };
  

export async function getStaticPaths() {
  
    // Fetch the blog post identifiers (IDs or slugs) from your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Blog/`)
    const blogs = await res.json();
  
    // Generate the paths for all blog posts
    const paths = blogs.map((blog) => ({
      params: { title: slugify(blog.title) }, // Use the appropriate identifier (ID or slug)
    }));
  
    return {
      paths,
      fallback: true,
    };
  }
  
  export async function getStaticProps({ params }) {
    // const decodedSlug = decodeURIComponent(params.title);
    // Fetch the data for a specific blog post based on the ID or slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Blog/${params.title}/`)
    const blog = await res.json()
  
    return {
      props: {
        blog,
      },
    };
  }