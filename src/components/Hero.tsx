


const Hero = ()=>{
    return(
        <section className="min-h-[90vh] flex items-center bg-gray-100">
         <div className="max-w-7xl mx-auto px-6">
         <div className="max-w-3xl">
            <p className = "text-orange-600 font-semibold mb-3">
                welcome to constructionHub
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Building The Future of Construction
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
                Discover construction projects,internship opportunities,
                company events,and career openings all in one platform.
            </p>

            <div className="mt-8 flex gap-4">
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
                    Explore Projects
                </button>

                <button className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white">
                    Apply Internship
                </button>
            </div>

            <div className="mt-12 flex gap-10 flex-wrap">
                <div>
                    <h2 className="text-3xl font-bold">150+</h2>
                    <p className="text-gray-600">Projects</p>
                </div>

                <div>
                    <h2 className="text-3xl font-bold">50+</h2>
                    <p className="text-gray-600">Companies</p>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">1000+</h2>
                    <p className="text-gray-600">Students</p>
                </div>
            </div>
         </div>
         </div>

      </section>
    );
};

export default Hero;