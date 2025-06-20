import { asyncError, errorHandler } from "@/app/middlewares/error";
import { Task } from "@/app/model/Task";
import { mongoDbConnection, auth } from "@/app/Utils/feature";

export default asyncError(async function handler(req, res) {
    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only POST Method is allowed.");
    }
    await mongoDbConnection();
    const { title, description } = req.body;
    const user = await auth(req);
    if (!user) { return errorHandler(res, 404, "Login To Access This Resource"); }
    const id=  user._id ||user[0].id;
    if (!title || !description) {
        return errorHandler(res, 422, "Unprocessable Entity");
    }
    await Task.create({
        title,
        description,
        user:id,
    })
    res.status(200).json({ success:true,message: "Task Created Success" });
})
