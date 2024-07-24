import express,{urlencoded} from "express";
const app=express();
import cors from "cors";
import cookie_parser from "cookie-parser";

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookie_parser());



// All the routes and the imports.


export {app}