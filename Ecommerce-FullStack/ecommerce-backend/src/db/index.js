// wee will be setting the database connection.
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB=async()=>{
    try {
        const connectionIns=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGODB connected PORT ${connectionIns.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB connection",error)
        process.exit(1);

    }
}
export default connectDB;