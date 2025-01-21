"use client"
import axios from "axios";
import Swal from "sweetalert2";


const page = () => {

    const handleAddService = async (e)=>{
        e.preventDefault();
        const newService = {
            name : e.target.name.value,
            category : e.target.category.value,
            description : e.target.description.value,
            photo : e.target.photo.value,
            price : e.target.price.value,
        }
        const resp = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/add-service/api`, newService)

        if(resp?.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Service has beed added.",
                showConfirmButton: false,
                timer: 1500
              });
            e.target.reset()

        }
    }

    return (
        <div>
            <h1 className="text-center my-5 mx-auto text-xl md:text-4xl font-medium">Add Service.</h1>
            <div className="border border-slate-900 border-t-slate-700 my-6 border-e-slate-600  w-full lg:w-[80%] rounded-md  shrink-0 shadow-2xl mx-auto">
                    <div className="text-center mx-auto text-lg md:text-3xl font-medium mt-8 ">Add all data carefully. </div>
                    <form onSubmit={handleAddService} 
                      className="px-3 xl:px-10 my-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="w-full">
                                <p className="my-3 text-sm font-thin">Hair cut name</p>
                                <input type="text" name='name' placeholder="name" className="input w-full input-bordered" required />
                            </div>
                            <div className="w-full">
                                <p className="my-3 text-sm font-thin">Category</p>
                                <input type="text" name='category' placeholder="category" className="input w-full input-bordered" required />
                            </div>
                        </div>
                        <div className="flex gap-4 flex-col lg:flex-row">
                            <div className="w-full">
                                <p className="my-3 text-sm font-thin">Description.</p>
                                <input type="text" name='description' placeholder="description" className="input w-full input-bordered" required />
                            </div>
                            <div className="w-full">
                                <p className="my-3 text-sm font-thin">Photo url</p>
                                <input type="text" name='photo' placeholder="Photo url" className="input w-full input-bordered" required />
                            </div>
                        </div>
                        <div className="">
                            <p className="my-3 text-sm font-thin">price</p>
                            <input type="number" name='price' placeholder="price" className="input w-full input-bordered" required />
                        </div>
                        <input className="w-full my-10 py-2 bg-orange-500 rounded cursor-pointer" type="submit" value="Add service" />
                    </form>
                </div>
        </div>
    );
};

export default page;