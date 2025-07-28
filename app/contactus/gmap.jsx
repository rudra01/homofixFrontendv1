

const gmap = () => {
  return (
    <section className="container mx-auto max-w-[1200px] py-9">
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d112077.82725340908!2d77.13652799133682!3d28.616808935921394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFloor%2C%20Rishi%20Complex%2C%20Ashok%20Vihar%2C%20Delhi%2C%20New%20Delhi%2C%20Delhi%20110052!5e0!3m2!1sen!2sin!4v1685030662048!5m2!1sen!2sin" width="100%" height="450" loading="lazy" ></iframe>
        <div className="address grid md:grid-cols-2 py-9 mt-9 px-2">
            <div className="column-1 pb-9">
                <h2 className="text-xl font-semibold">Registered Office Address: </h2>
                <p className="py-3">
                5139, Awas Vikas – 3, Panki Rd, Kalyanpur,
Kanpur, Uttar Pradesh - 208017
                </p>
            </div>
            <div className="column-1 pb-9">
                <h2 className="text-xl font-semibold">Phone No : </h2>
                <p className="py-3">
                    <a href="tel:+918800855760" >+91-88-00-855-760</a>
                </p>
            </div>
            <div className="column-1 pb-9">
                <h2 className="text-xl font-semibold">Office Address: </h2>
                <p className="py-3 pr-4">WP 501 D Second Floor, Rishi Complex, Ashok Vihar, Delhi, New Delhi, Delhi 110052</p>
            </div>
            <div className="column-1 pb-9 ">
                <h2 className="text-xl font-semibold">Email : </h2>
                <p className="py-3">
                    <a href="mailto:info@homofixcompany.com">info@homofixcompany.com</a>
                </p>
            </div>
        </div>
    </section>
  )
}

export default gmap