import { MongoClient, ServerApiVersion } from "mongodb";

let db ;
export const connectDB = async () =>{
    if(db){
        return db;
    }

    try {
        const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.udxqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });
        db = client.db('royal-salon')
        console.log("connected")
        return db;

    } catch (err) {
        console.log(err)
    }
}