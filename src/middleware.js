
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const middleware = async (request) =>{
    // const token = await cookies(request).get('next-auth.session-token');before deploying "no __Secure-"
    // const cookiesStore = 
    const token =  await cookies(request).get('__Secure-next-auth.session-token');
    const pathName = await request.nextUrl.pathname;

    console.log('token from middle were and its secure',token)

    if(pathName.includes('api')){
        return NextResponse.next();
    }

    if(!token){
        return NextResponse.redirect(new URL(`/login?redirect=${pathName}`, request.url))
    }
    return NextResponse.next();
}

export const config={
    matcher : ["/my-bookings/:path*", "/dashboard/:path*" ],   runtime: 'nodejs',
}