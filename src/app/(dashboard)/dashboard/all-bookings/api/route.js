import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const POST = async (request) =>{
    const db = await connectDB();
    const bookingsCollection = db.collection('allBookings');
    const newBookings = await request.json();

    try {
        const resp = await bookingsCollection.insertOne(newBookings)
        console.log(resp)
        return NextResponse.json({message : 'Succesfully added to bookings'}, {status : 200})
    } catch (error) {
        return NextResponse.json({message : 'something wrong'}, {status : 304})
    }
}