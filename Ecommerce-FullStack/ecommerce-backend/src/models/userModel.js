import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema({
    fullname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    role: {
        type: String,
        default: "normal", 
      },
},{timestamps:true})


// we can write the method for converting the password into a hash password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// the below will comapare the password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema);