"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const page = () => {
    const [allBookings, setAllBookings] =useState([])

    const loadData = async ()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/all-bookings/get-bookings`)
        setAllBookings(res.data.allBookings)
    }

    const handleDelete = async (id)=>{
        const deleted = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/booking/${id}`)
        if(deleted.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Booking has been deleted after cutting.",
                showConfirmButton: false,
                timer: 1500
              });
            loadData()
        }
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        allBookings.map((service,inx) =><tr key={service._id}>
                            <th>{inx + 1}</th>
                            <td>{service?.name}</td>
                            <td>{service?.price}</td>
                            <td>{service?.email}</td>
                            <td>{service?.time}</td>
                            <td>
                                <Link href={`/my-bookings/api/update/${service._id}`} className="btn mr-3 btn-sm text-white btn-primary" > Send A Time.</Link>
                                <button onClick={()=> handleDelete(service?._id)} className="btn btn-sm btn-gost">Delete</button>
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