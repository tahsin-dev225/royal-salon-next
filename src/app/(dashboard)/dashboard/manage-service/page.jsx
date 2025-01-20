"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCross } from "react-icons/bi";
import Swal from "sweetalert2";
import { TiDeleteOutline } from "react-icons/ti";


const page = () => {
    const [allService, setAllServices] = useState([])
    
    const loadData = async ()=>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/manage-service/api`)
        setAllServices(res?.data?.allServices)
    }

    const handleDelete = async (id) =>{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/manage-service/api/${id}`)

        if(deleted.data.status === 200){
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

    // console.log(allService)
    useEffect(()=>{
        loadData()
    },[])

    return (
        <div>
            <h1 className="text-white text-xl lg:text-3xl font-bold flex justify-center items-center">Services Details</h1>
            <div className="overflow-x-auto w-full my-14">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th  className="hidden lg:flex"></th>
                            <th className="hidden lg:flex">service Name</th>
                            <th>Photo</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        allService.map((service,inx) =><tr key={service._id}>
                            <th className="hidden lg:flex">{inx + 1}</th>
                            <td>
                                <Image src={service?.photo} width={50} height={30} alt="Service" />
                                <p className="text- lg:hidden my-2">{service?.name}</p>
                            </td>
                            <td className="hidden lg:flex ">{service?.name}</td>
                            <td>{service?.price}</td>
                            <td>{service?.category}</td>
                            <td>
                                {/* <Link href={`/my-bookings/update/${service._id}`} ><button className="btn text-white btn-primary">Edit</button></Link> */}
                                <button onClick={()=> handleDelete(service?._id)} className=" text-red-600 text-2xl md:text-3xl "><TiDeleteOutline/></button>
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