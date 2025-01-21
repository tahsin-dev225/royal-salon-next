
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request)=>{
    const newUser = await request.json();
    try {
        const db = await connectDB();
        // console.log(db)
        const userCollection = db.collection('users');
        const existUser = await userCollection.findOne({email : newUser.email});
        if(existUser){
            return NextResponse.json({message : "users Exists"} , {status : 304})
        }
        const resq = await  userCollection.insertOne( newUser);
        
        return NextResponse.json({message : "uer created"}, {status : 200})
    } catch (err) {
        return NextResponse.json({message : "something error"}, {status : 500})
    }
}