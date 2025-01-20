import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request,{params})=>{
    const param = await params;
    const db = await connectDB();
    const servicesCollection = db.collection('services')

    try {
        const resp = await servicesCollection.deleteOne({_id : new ObjectId(param.id)});
        return NextResponse.json({response : resp}, {message : 'deleted successfully'})
    } catch (error) {
        return NextResponse.json({message : 'Something wrond'})
    }
}