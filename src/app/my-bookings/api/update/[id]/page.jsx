"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


const page = ({params}) => {
    const route = useRouter();

    const handleUpdateTime = async (e)=>{
        e.preventDefault();
        const updated = {
            time : e.target.time.value
        }
        const resp = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/booking/${params.id}`,updated)
        if(resp.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Time sended.",
                showConfirmButton: false,
                timer: 1500
              });
            route.push('/dashboard/all-bookings')
        }
    }

    return (
        <div>
            <h1 className="text-center py-20 mx-auto text-4xl font-medium">Update Booking time.</h1>
            <div className="border border-slate-900 border-t-slate-700 my-6 border-e-slate-600  w-full lg:w-[80%] rounded-md  shrink-0 shadow-2xl mx-auto">
                    <div className="text-center mx-auto text-3xl font-medium mt-8 ">Add time carefully. </div>
                    <form onSubmit={handleUpdateTime} 
                      className="px-10 my-6">
                        
                        <div className="">
                            <p className="my-3 text-sm font-thin">Send a time.</p>
                            <input type="text" name='time' placeholder="Write the time" className="input w-full input-bordered" required />
                        </div>
                        <input className="w-full my-10 py-2 bg-orange-500 rounded cursor-pointer" type="submit" value="Add service" />
                    </form>
                </div>
        </div>
    );
};

export default page;