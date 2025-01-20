"use client"
import { useSession } from "next-auth/react";


const CurrentUser = () => {
    
    const session = useSession();
    
    return session?.data?.user?.email
};

export default CurrentUser;