import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async (request)=>{
    const db = await connectDB();
    const bookingsCollection = db.collection('allBookings')

    try {
        const allBookings = await bookingsCollection.find().toArray();
        return NextResponse.json({allBookings})
    } catch (error) {
        return NextResponse.json({message : "something wrond"}, {status : 500})
    }
}