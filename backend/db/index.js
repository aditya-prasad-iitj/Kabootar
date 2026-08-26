import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){
    // console.log("here1");
    
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Succefully Connected to DB Host ${(connectionInstance).connection.host}`);
        // console.log("here2");
        
        
        } catch (error) {
        // console.log("here3");
        
        console.log("ERROR Connecting to DB: ", error);
        process.exit(1);
    }

}

export default connectDB;