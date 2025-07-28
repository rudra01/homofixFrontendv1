// JobDescription.js




const JobDescription = ({ content }) => {
  // Extract job overview data
  // const jobOverview = content?.description.match(/<strong>Job Overview:<\/strong>(.*?)<p>&nbsp;<\/p>/s);
  console.log(content);

  // You can customize the rendering logic here
  return <div className="py-2 w-fit">{content}</div>;
};

export default JobDescription;
