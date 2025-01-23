"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { MdBookmarks } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";

const layout = ({children}) => {
    const [myLoading , SetMyLoading] = useState(true)
    const [isAdmin , SetIsAdmin] = useState(false)
    const pathName = usePathname();
    const route = useRouter();
    const currentLink ="py-1 px-1 md:px-3 flex-col lg:flex-row flex justify-center items-center gap-2 w-[90%] mx-auto text-center rounded-md bg-sky-500";
    const baseLink ="py-1 px-1 md:px-3  flex-col lg:flex-row flex justify-center items-center gap-2 w-[90%] mx-auto text-center rounded-md bg-slate-500";
    const {data , status} = useSession();
    const email = data?.user?.email;
    
    useEffect(  ()=>{
        if(status === 'authenticated'){
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/manage-users/api/${email}`)
            .then(async(res) =>{
                const user = await res.json();
                // console.log(user, 'rle', user.role)
                if(user?.role === 'admin'){
                    // console.log('tor may khay')
                    SetIsAdmin(true)
                    SetMyLoading(false)
                }
                SetMyLoading(false)
            }).catch((error)=>{
                SetMyLoading(false)
            })
        }
        
    },[status])

    if(myLoading){
        return <div className="flex justify-center items-center h-screen w-full">
            <h1 className="text-4xl mx-auto">Loading.....</h1>
        </div>
    }

    // console.log(isAdmin)

    if(!isAdmin){
        return <div className="flex justify-center items-center h-screen w-full">
            <h1 className="text-center mx-auto">You are not Valid.</h1>
        </div>
    }

    if(isAdmin){
        return <div className="lg:pt-20 flex">
                    <div className="xl:min-w-48 space-y-5 xl:min-h-[759px] xl:max-w-72 xl:w-full shadow-2xl border-r border-r-slate-700 flex p-1 md:p-2 flex-col items-center">
                        {
                            dashNav.map((nav,idx)=><Link 
                            key={idx}
                            className={pathName === nav.path ? currentLink : baseLink} href={nav.path}> 
                            <span>{nav.icon}</span>
                                <span className="text-[9px] lg:text-base">{nav.title}</span>
                            </Link>)
                        }
                    </div>
                    <div className="w-full px-1 py-4 md:p-5">
                        {children}
                    </div>
                
            </div>
        
    }
    
};

const dashNav = [
    {
        path : "/dashboard/add-service",
        title : "Add Service",
        icon : <BiBookAdd />,
    },
    {
        path : "/dashboard/manage-service",
        title : "Manage Service",
        icon : <MdDesignServices />
    },
    {
        path : "/dashboard/all-bookings",
        title : "All Bookings",
        icon : <MdBookmarks />
    },
]

export default layout;