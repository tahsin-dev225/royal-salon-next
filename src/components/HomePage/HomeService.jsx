import { getServices } from "@/provider/getServices";
import AllService from "../AllService";


const HomeService = async () => {
    const {allServices} =await getServices();

    return (
        <div className="pt-6 pb-4 lg:py-20 md:max-w-[90%] xl:max-w-[1240px] mx-auto">
            <h1 className="text-center mt-8 mx-auto text-xl md:text-5xl font-bold lg:font-medium">Our All Services.</h1>
            <p className="lg:w-[50%] w-[90%] text-center mt-3 mb-6 mx-auto text-[13px] md:text-[15px] font-sans font-thin "> Whether you're here for a complete transformation or a quick touch-up, we guarantee you'll leave feeling like royalty.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 p-2 my-5 px-2 lg:p-0 ">
                {
                    allServices?.slice(0,6)?.map((service , idx)=> <AllService key={service._id} service={service}></AllService>)
                }
            </div>
        </div>
    );
};

export default HomeService;