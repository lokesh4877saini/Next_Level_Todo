import { asyncError, errorHandler } from "@/app/middlewares/error";
import { Task } from "@/app/model/Task";
import { auth, mongoDbConnection } from "@/app/Utils/feature";

export default asyncError(async function handler(req, res) {
    if (req.method !== "GET") {
        return errorHandler(res, 400, "Only GET Method is allowed.");
    }
    await mongoDbConnection();
    const user = await auth(req);
    if (!user) return errorHandler(res, 404, "Login To Access This Resource");    
    const tasks = await Task.find({user:user._id});
    if(!tasks){
        errorHandler(res, 400, "Could not Found any Task.");
    }
    res.status(200).json({success:true, message: "Task Found Success" ,tasks});
})
