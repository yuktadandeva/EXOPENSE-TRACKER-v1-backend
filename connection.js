import mongoose from "mongoose";

export const createConnection  = async ()=>{
    try{
        const result = await mongoose.connect(process.env.DB_URL);
        console.log("DB is connected")
    }catch(err){
        console.log("DB connection error")
    }

}