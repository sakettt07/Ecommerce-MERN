import { app } from "./app.js";
import dotenv from "dotenv"


dotenv.config({
    path:'./env'
})


app.get("/",(req,res)=>{
    res.send("Hehe i have setted up the backend for the ecommerce part");
})

app.listen(3000,()=>{
    console.log("ypur server is running on the port 3000");
})