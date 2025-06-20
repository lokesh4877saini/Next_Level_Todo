import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserShema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[5,"Password Too short"]
    }
})
export const User = mongoose.models.User || mongoose.model("User", UserShema);
