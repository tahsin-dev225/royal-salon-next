import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET = async (request) =>{
    const db = await connectDB();
    const servicesCollection = db.collection('services');
    try {
        const allServices = await servicesCollection.find().toArray();
        // console.log('allservice', allServices)
        return NextResponse.json({allServices})     
    } catch (error) {
        return NextResponse.json({message : 'error form manage api'},{status : 500})
    }
}