
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const Banner = () => {

    return (
        <div className="3xl:container  bg-[url('/img/slBanner.jpg')] w-full bg-cover relative mx-auto xl:max-h-[800px] 2xl:h-screen">
            <div className="w-full h-[300px] p-3 flex items-center justify-center flex-col lg:py-20 lg:h-screen max-h-[800px]  top-0  bg-black bg-opacity-60">
                <h3 className="text-2xl font-mono text-sky-50">Fell the premiumness.</h3>
                <h1 className="text-2xl lg:my-3 lg:text-6xl text-center font-serif font-semibold ">
                    <span className="text-white">Wellcome to  </span>
                    <span className="bg-gradient-to-br from-[#b5c54f] mr-3 to-[#c18f44fa]  bg-clip-text text-transparent"> Royal Style</span>
                    <span className="bg-gradient-to-br from-orange-200 to-[#e7bc3c]  bg-clip-text text-transparent"> Salon</span>
                </h1>
                <p className="font-light text-[15px] text-center text-slate-100 lg:leading-10">Experience luxury, elegance, and sophistication at Royal Style Salon, where beauty meets artistry.</p>
                <Link  className="py-2 px-6 hover:bg-orange-400  flex justify-center items-center gap-2 bg-gradient-to-l from-[#7d502ea1] delay-200 text-white transition-all border-[1px]  to-[#f59f0b6e] border-[#ba8f53] rounded-[3px] my-5 njr"
                 href={'/services'}>
                    Make A Apointment <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Banner;