"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
    const [myBookings, setMyBookings] = useState([]);
    const session = useSession();
    // console.log('email',session?.data?.user?.email)

    const loadData = async ()=>{
        const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/${session?.data?.user?.email}`);
        // console.log('my book data',resp?.data)
        setMyBookings(resp?.data?.myBookings)
    }

    useEffect(()=>{
        if(session?.data?.user?.email){
           loadData(); 
        }
        
    },[session])

    return (
        <div className="pt-20 pb-8 xl:max-w-[1220px] mx-auto">
            <h1 className="text-white text-3xl font-bold flex justify-center items-center">Services Details</h1>
            <div className="overflow-x-auto w-full my-14">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>service Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        myBookings.map((service,inx) =><tr key={service._id}>
                            <th>{inx + 1}</th>
                            <td>{service?.name}</td>
                            <td>{service?.price}</td>
                            <td>{service?.time ? service?.time : "Plese wait for Response."}</td>
                            <td>
                                <Image className="h-auto" src={service.photo} width={50} height={50} alt="service" />
                            </td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;