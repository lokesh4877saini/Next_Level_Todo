import { asyncError, errorHandler } from "@/app/middlewares/error";
import { auth, mongoDbConnection } from "@/app/Utils/feature";
import { Task } from "@/app/model/Task";

export default asyncError(async function handler(req, res) {
    await mongoDbConnection();

    const user = await auth(req);
    if (!user) return errorHandler(res, 404, "Login To Access This Resource");

    const taskId = req.query.id;
    const task = await Task.findById(taskId);
    if (!task) return errorHandler(res, 404, "Task not Found");

    // 🔐 Ensure user owns this task
    if (task.user.toString() !== user._id.toString()) {
        return errorHandler(res, 403, "You are not authorized to modify this task.");
    }

    if (req.method === "PUT") {
        task.isCompleted = !task.isCompleted;
        await task.save();
        return res.status(200).json({ success: true, message: "Task Updated Successfully!" });
    } else if (req.method === "DELETE") {
        await task.deleteOne();
        return res.status(200).json({ success: true, message: "Task Deleted Successfully!" });
    } else {
        return errorHandler(res, 400, "Only PUT And DELETE Methods is allowed.");
    }
});
