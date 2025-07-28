import RegisterExp from "./RegisterExp"
const Partner = () => {
  return (
    <section className="container mx-auto mt-10">
        <div className="grid grid-cols-2 ">
            <div className="columns-1 flex flex-col md:justify-center align-middle text-center">
                <h2 className="text-xl mb-3 md:text-3xl font-semibold " >REGISTER AS A PROFESSIONAL</h2>
                <div className="btn">
                  < RegisterExp />
                </div>
            </div>
            <div className="columns-1">
                <img src="/assets/imgs/partner.png" width={350}   alt="" />
            </div>
        </div>
        
    </section>
  )
}

export default Partner