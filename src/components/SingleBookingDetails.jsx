"use client"
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";


const SingleBookingDetails = ({service, idx,loadData}) => {
    const [disable, setdisable] = useState(true)
    const disablelButton = "py-1 px-5  bg-slate-600";
    const normalButton = "py-1 px-5 cursor-pointer bg-orange-600";

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

    const handleUpdateTime = async(e,id)=>{
        e.preventDefault();
        const updated = {
            time : e.target.date.value
        }
        const resp = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/booking/${id}`,updated)
        if(resp.status === 200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Time sended.",
                showConfirmButton: false,
                timer: 1500
            });
            loadData()
        }
    }

    return (
        <tr>
            <th>{idx + 1}</th>
            <td>{service?.name}</td>
            <td>{service?.price}</td>
            <td>{service?.email}</td>
            <td>{service?.time}</td>
            <td>
                <form onSubmit={(e)=> handleUpdateTime(e,service._id)} className="flex border-[1px] border-slate-600  rounded bg-slate-600">
                    <input  onChange={()=>setdisable(false)} className="py-1 px-2 w-full" type="date" name="date"  />
                    <input disabled={disable} className={`${disable ? disablelButton : normalButton}  `}  type="submit" value="Set Time" />
                    
                </form>
            </td>
            <td>
                {/* <Link href={`/my-bookings/api/update/${service._id}`} className="btn mr-3 btn-sm text-white btn-primary" > Send A Time.</Link> */}
                <button onClick={()=> handleDelete(service?._id)} className="btn btn-sm btn-gost">Delete</button>
            </td>
        </tr>
    );
};

export default SingleBookingDetails;