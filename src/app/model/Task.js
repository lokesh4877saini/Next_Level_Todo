import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TaskShema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})
export const Task = mongoose.models.Task || mongoose.model("Task", TaskShema);