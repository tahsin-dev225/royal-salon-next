"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";


const page = () => {
    const [disable, setdisable] = useState(false)
    const router =  useRouter();
    const normalButton = "w-full my-6 py-2 bg-orange-500 rounded"
    const disablelButton = "w-full text-black my-6 py-2 bg-slate-200 rounded"

    const handleSignup =async (e) =>{
        setdisable(true)
        e.preventDefault();
        const newUser = {
            name : e.target.name.value,
            email : e.target.email.value,
            password : e.target.password.value,
        }
        // console.log(newUser)
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`,{
            method : "POST",
            body : JSON.stringify(newUser),
            headers : {
                "content-type" : "application/json"
            }
        })
    
            if(resp?.status === 200){
                const res = await signIn("credentials", {
                    email : newUser?.email,
                    password : newUser?.password,
                    redirect : false,
                })
                setdisable(false)
                e.target.reset();
                router?.push('/')
            }else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Information is wrong or email already exist.",
                    showConfirmButton: false,
                    timer: 3000
                });
                setdisable(false)
            }
            setdisable(false)
    }

    return (
        <div className='container mx-auto  py-20'>
            <div className="grid grid-cols-2 gap-0 items-center">
                <Image src='/img/login.png' className='mx-auto' width={500} height={500} alt='login' />
                <div className="border border-slate-900 border-t-slate-700 my-6 border-e-slate-600  w-full lg:w-[80%] rounded-md  shrink-0 shadow-2xl mx-auto">
                    <div className="text-center mx-auto text-3xl font-medium mt-8 ">Sign Up </div>
                    <form 
                     onSubmit={handleSignup} 
                      className="px-10 my-6">
                        <div className="">
                            <p className="my-3">Name</p>
                            <input type="text" name='name' placeholder="name" className="input w-full input-bordered" required />
                        </div>
                        <div className="">
                            <p className="my-3">Email</p>
                            <input type="text" name='email' placeholder="Email" className="input w-full input-bordered" required />
                        </div>
                        <div className="">
                            <p className="my-3">Password</p>
                            <input type="text" name='password' placeholder="Password" className="input w-full input-bordered" required />
                        </div>
                        <input disabled={disable} className={`${disable ? disablelButton : normalButton}  `} type="submit" value="Sign Up" />
                    </form>
                    <div className="mx-auto my-4 mb-8 text-center ">Have an account? <Link href='/login' className='text-[#FF3811] font-bold'>login</Link></div>
                </div>
            </div>
        </div>
    );
};

export default page;