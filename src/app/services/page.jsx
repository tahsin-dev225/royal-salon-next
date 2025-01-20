
import AllService from "@/components/AllService";
import { getServices } from "@/provider/getServices";


const page =async ()  => {
    const {allServices} =await getServices();
    console.log(allServices)
    return (
        <div className="lg:py-20 pb-5 xl:max-w-[1240px] mx-auto">
            <h1 className="text-center my-8 mx-auto text-2xl lg:text-5xl font-medium">Our All Services.</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 p-2 my-5 ">
                {
                    allServices?.map((service , idx)=> <AllService key={service._id} service={service}></AllService>)
                }
            </div>
        </div>
    );
};

export default page;