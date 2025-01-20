"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const [myLoading , SetMyLoading] = useState(true)
    const [isAdmin , SetIsAdmin] = useState(false)
    const {data, status} = useSession();
    const email = data?.user?.email;
    
        useEffect(  ()=>{
            if(status === 'authenticated'){
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/manage-users/api/${email}`)
                .then(async(res) =>{
                    const user = await res.json();
                    console.log(user, 'rle', user.role)
                    if(user?.role === 'admin'){
                        console.log('tor may khay')
                        SetIsAdmin(true)
                        SetMyLoading(false)
                    }
                })
            }
            
        },[status])

    return (
        <div className="navbar z-40 w-full   mx-auto right-0 left-0 bg-stone-600 drop-shadow-2xl bg-opacity-60 lg:fixed">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-60 mt-3 w-52 p-2 shadow">
                    {
                        navItems.map((item,idx)=><li key={idx}>
                            <Link href={item.path}>{item.title}</Link>
                        </li>)
                    }
                </ul>
                </div>
                <Image className=" bg-white rounded lg:mx-10 shadow-2xl h-auto" src={'/img/royal-selon.webp'} width={100} height={50} alt="logo" />
            </div>
            <div className="navbar-center  hidden lg:flex">
                <div className="flex item-center gap-6 font- text-md">
                    {
                        navItems.map((item, idx) =><Link className="hover:text-yellow-200" key={idx} href={item.path}>
                            {item.title}
                        </Link>)
                    }
                    {
                        isAdmin ? <Link href={'/dashboard'} className="hover:text-yellow-200">Dashboard</Link> : ''
                    }
                </div>
            </div>
            {
                // data?.user?.email ? <h1 className="mx-5 hidden lg:flex">{data?.user?.email} </h1> : ''
            }
            <div className="navbar-end lg:mx-10 gap-2">
                {
                    data?.user?.email ? 
                        <button onClick={()=> signOut()} className="btn btn-secondary rounded-3xl btn-sm btn-outline"> logout <span className="text-white"> <FaSignOutAlt/></span></button>
                    :
                    <Link className="py-2 px-8 rounded-md hover:bg-opacity-50 transition-all delay-200 hover:bg-amber-700 bg-amber-800" href={'/login'}>Login</Link>
                }
            </div>
        </div>
    );
};

const navItems = [
    {
        title : "Home",
        path : "/"
    },
    {
        title : "Services",
        path : "/services"
    },
    {
        title : "My Bookings",
        path : "/my-bookings"
    },
]

export default Navbar;