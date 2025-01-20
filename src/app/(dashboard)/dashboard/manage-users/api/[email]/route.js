import { connectDB } from "@/lib/connectDB";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const GET = async (request,{params}) =>{
    const param = await params;
    const db = await connectDB();
    
    const usersCollection = db.collection('users');
    try {
        const CurrentDbUser = await usersCollection.findOne({email : param?.email});
        console.log("ccc", CurrentDbUser ,'kk',param.email)
        return NextResponse.json(CurrentDbUser)
    } catch (error) {
        return NextResponse.json({message : 'error form manage api'},{status : 500})
    }
}