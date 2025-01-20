import { connectDB } from "@/lib/connectDB";
import  NextAuth  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    secret : process.env.NEXT_PUBLIC_AUTH_SECRET,
    session : {
        strategy : 'jwt',
        maxAge : 30 * 24 * 60 * 60
    },

    providers : [
        CredentialsProvider({
            credentials : {
                email : {},
                password : {}
            },
            async authorize (credentials) {
                const {email, password} = credentials;
                if(!email || !password){
                    return null;
                }

                const db = await connectDB();
                const currentUser = await db.collection('users').findOne({email})
                if(!currentUser){
                    return null;
                }
                const passwordMatched = password === currentUser.password;
                if(!passwordMatched){
                    return null;
                }

                return currentUser;
            }
        })
    ],

    pages : {
        signIn : '/login'
    },

    callbacks : {
        async signIn({ user }){
            return user
        }
    }
})

export {handler as POST ,handler as GET}