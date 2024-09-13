import e from "express";
import dotenv from "dotenv";
import { createConnection } from "./connection.js";
import { userRoutes } from "./modules/user/routes/user-routes.js";
import { billRoutes } from "./modules/user/routes/bill-routes.js";
import cors from "cors"

const app = e();
app.use(e.json());
app.use(cors());
dotenv.config();

app.use("/", userRoutes)
app.use("/", billRoutes)

const PORT = 4444;
const promise = createConnection();

promise.then(r=>{

    app.listen(PORT, '0.0.0.0', err=>{
        if(err){
         console.log("Application Crash")
        }else{
            console.log("Application Up and Running")
        }
    })    

}).catch(err=>{
    console.log("Application crash DB is not connecting", err)
})

