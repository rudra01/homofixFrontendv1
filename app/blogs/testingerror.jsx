import { useNavigation } from 'next/navigation'
const BlogPage = ({blog}) => {
  const navigation = useNavigation();
  if (navigation.isFallback) {
    return <div>Loading...</div>;
  }
  return (
      <section className="container mx-auto py-20">
          <h1>{blog.title}</h1>
          <img src={blog.feature_img} alt="feature image" width="100%" />
        {/* Include the rest of the blog post content */}
      </section>
  )
  
}

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
  const res = await fetch('https://support.homofixcompany.com/api/Blog/');
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
  const res = await fetch(`https://support.homofixcompany.com/api/Blog/${params.title}/`);
  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}

export default BlogPage;

