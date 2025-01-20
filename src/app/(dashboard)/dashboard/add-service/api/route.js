import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const POST = async (request)=>{
    const db = await connectDB();
    const servicesCollection =  db.collection('services')
    const newService = await request.json()
    try {
        const resp = await servicesCollection.insertOne(newService)
        
        // console.log(resp)
        return NextResponse.json({message : "Service added successfully"}, {status : 200})
    } catch (error) {
        console.log(error)
    }
}