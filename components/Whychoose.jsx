

const Whychoose = () => {
  return (
    <section className='container mx-auto px-2 max-w-[1200px] py-5 md:mt-10' >
        <h2 className='md:text-2xl text-center font-semibold'>Why Choose Us?</h2>
        <div className="grid  md:grid-cols-4 py-9 text-center">
            <div className="columns-1 text-center bg-gray-100 m-1 py-4">
                <div className="icon flex justify-center">
                    <img src="/professional.png" width={75} alt="" />
                </div>
                <div className="content p-2 px-5">
                    <h4 className='md:text-base font-semibold  py-4 text-sm'> Highly Skilled Professionals</h4>
                    <p className="text-xs">
                    We have a team of highly skilled and experienced professionals who are experts in their respective fields. Whether you need appliance repair, cleaning, pest control, electrician services, carpentry, plumbing, or home painting, our professionals are well- trained to handle any task with precision and efficiency
                    </p>
                </div>
            </div>
            <div className="columns-1 text-center bg-gray-100 m-1 py-4">
                <div className="icon flex justify-center">
                    <img src="/delivery-bike.png" width={75} alt="" />
                </div>
                <div className="content p-2 px-5">
                    <h4 className='md:text-base font-semibold py-4 text-sm'>Convenient Service Delivery</h4>
                    <p className="text-xs">
                    We understand the value of your time and convenience. With
                    our platform, you can easily connect with skilled professionals who will provide services at your doorstep. No need to waste time searching for reliable service providers or waiting for appointments. We bring the experts to you, saving you time and effort.
                    </p>
                </div>
            </div>
            <div className="columns-1 text-center bg-gray-100 m-1 py-4">
                <div className="icon flex justify-center">
                    <img src="/quality.png" width={75} alt="" />
                </div>
                <div className="content p-2 px-5">
                    <h4 className='md:text-base font-semibold py-4 text-sm'>Exceptional Service Quality</h4>
                    <p className="text-xs">
                    We are committed to delivering exceptional service quality to
our customers. Our professionals go above and beyond to ensure that every task is completed to the highest standards. From repairing appliances to painting your home, we take pride in our attention to detail and strive to exceed your expectations.
                    </p>
                </div>
            </div>
            <div className="columns-1 text-center bg-gray-100 m-1 py-4">
                <div className="icon flex justify-center">
                    <img src="/consumer.png" width={75} alt="" />
                </div>
                <div className="content p-2 px-5">
                    <h4 className='md:text-base font-semibold py-4 text-sm'>Trust and Reliability</h4>
                    <p className="text-xs">
                    We understand the importance of trust when inviting professionals into
your home. That's why we carefully screen and vet all our service providers to ensure they are trustworthy and reliable. You can have peace of mind knowing that our professionals are professionals who will respect your property and provide the highest level of service.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Whychoose