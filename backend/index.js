import {app, server} from "./App.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from './db/index.js';

dotenv.config({path: "../.env"});


connectDB()
.then(()=>{
    server.listen(process.env.PORT || 3000, ()=>{
        console.log("App listening on Port ", process.env.PORT);
    })
})
.catch((err)=>{
    console.log("Couldn't connect MongoDB: ", err);
    
})

