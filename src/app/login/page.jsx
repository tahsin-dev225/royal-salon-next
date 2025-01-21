"use client"
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const page = () => {
    const router = useRouter()

    const handleLogin =async (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const resp = await signIn("credentials", {
            email,
            password,
            redirect : false,
        })
        // console.log(resp)
        if(resp?.status === 200){
            router.push('/')
        }else{
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Information is wrong.",
                showConfirmButton: false,
                timer: 3000
            });
        }
    }

    return (
        <div className='container mx-auto  py-20'>
            <div className="grid grid-cols-2 gap-0 items-center">
                <Image src='/img/login.png' className='mx-auto' width={500} height={500} alt='login' />
                <div className="border border-slate-900 border-t-slate-700 my-6 border-e-slate-600 w-full lg:w-[80%] rounded-md shrink-0 shadow-2xl mx-auto">
                    <div className="text-center mx-auto text-3xl font-medium mt-8 ">login </div>
                    <form 
                     onSubmit={handleLogin} 
                      className="px-10 my-6">
                        <div className="">
                            <p className="my-3">Email</p>
                            <input type="text" name='email' placeholder="Email" className="input w-full input-bordered" required />
                        </div>
                        <div className="">
                            <p className="my-3">Password</p>
                            <input type="text" name='password' placeholder="Password" className="input w-full input-bordered" required />
                        </div>
                        <input className="w-full my-6 py-2 bg-orange-500 rounded " type="submit" value="Login" />
                    </form>
                    <div className="mx-auto my-4 mb-8 text-center ">Don't have account? <Link href='/signup' className='text-[#FF3811] font-bold'>Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
};

export default page;