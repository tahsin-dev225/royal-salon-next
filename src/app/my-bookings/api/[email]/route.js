
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request,{params})=>{
    const param = await params;
    const db = await connectDB();
    const bookingsCollection = db.collection('allBookings')

    try {
        const myBookings = await bookingsCollection.find({email : param.email}).toArray();
        return NextResponse.json({myBookings})
    } catch (error) {
        return NextResponse.json({message : "something wrond"}, {status : 500})
    }
}