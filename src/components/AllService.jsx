"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


const AllService = ({service}) => {
    const {_id, name, category,photo,price, description} = service || {};
    const {data} = useSession();
    const route = useRouter();
    
    const handleBooking = async (id)=>{
        const bookings = {
            email : data?.user?.email,
            userName : data?.user?.name,
            bookingId : _id,
            name,
            category,
            photo,
            price,
            description,
        };
        if(data?.user?.email){
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/all-bookings/api`, bookings)

            if(res.status === 200){
            Swal.fire({
                title: "Your have Confirmed Your Booking.",
                text: "Please Wait some time to get a massage for your service time.",
                icon: "success",
                html :`
                Please rechech ,
                <a className="text-amber-300" href="/my-bookings" autofocus > My Bookings</a>,
            `,
              });
        }
        }else{
            route.push('/login')
        }
    }

    return (
        <div className="py- px-  rounded shadow-lg  border-slate-900 border-t border-r">
            <div className="relative">
                <Image className="w-full max-h-[390px] rounded mx-auto h-full" src={photo} width={400} height={600} alt="cut" />
                <h3 className="font-medium text-xl absolute mx-auto top-0 rounded px-3 py-2 bg-slate-700 bg-opacity-80">{name}</h3>
            </div>
            <div className="py-3 px-3">
                <p className="text-sm line-clamp-2 my-3  font-thin">{description}</p>
                <div className="flex justify-between my-2">
                    <p className="text-red-300 text-lg ">{price} $</p>
                    <button onClick={()=>handleBooking(_id)} className="btn  btn-sm btn-info rounded hover:text-white btn-outline">Book This</button>
                </div>
            </div>
        </div>
    );
};

export default AllService;