import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request , {params}) =>{
    const param = await params;
    const db = await connectDB();
    const myBookings = db.collection('allBookings');

    try {
        const resp = await myBookings.deleteOne({_id : new ObjectId(param.id)});
        return NextResponse.json({response :resp, message : "Deleted"}, {status : 200})
    } catch (error) {
        return NextResponse.json({message : "Wrong in my bookings delete mothod"}, {status : 500})
    }
}

export const PATCH = async (request , {params}) =>{
    const param = await params;
    const db = await connectDB();
    const bookingsCollection = db.collection('allBookings')
    const updateDoc = await request.json();
    try {
        const resp = await bookingsCollection.updateOne(
            {_id : new ObjectId(param.id)},
            {
                $set : {
                    ...updateDoc
                }
            },
            {
                upsert : true
            }
        );
        return NextResponse.json({message : "updated the booking", response : resp},{status : 200})
    } catch (err) {
        return NextResponse.json({message : "updated goes wrong"},{status : 500})
    }
}

export const GET = async (request , {params}) =>{
    const param = await params;
    const db = await connectDB();
    const myBookings = db.collection('allBookings');

    try {
        const resp = await myBookings.findOne({_id : new ObjectId(param.id)});
        return NextResponse.json({resp})
    } catch (error) {
        return NextResponse.json({message : "Wrong in my bookings"}, {status : 500})
    }
}