"use client"
import SingleBookingDetails from "@/components/SingleBookingDetails";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


const page = () => {
    const [allBookings, setAllBookings] =useState([])

    const loadData = async ()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/all-bookings/get-bookings`)
        setAllBookings(res.data.allBookings)
    }

    useEffect(()=>{
        loadData()
    },[])

    return (
        <div>
            <h1 className="text-white text-3xl font-bold flex justify-center items-center">All Bookings Details</h1>
            <div className="overflow-x-auto w-full my-14">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Bookings Name</th>
                            <th>Price</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Set Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        allBookings.map((service,idx) =><SingleBookingDetails key={service._id} service={service} idx={idx} loadData={loadData} ></SingleBookingDetails>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;