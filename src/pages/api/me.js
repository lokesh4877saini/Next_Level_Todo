import { asyncError, errorHandler } from "@/app/middlewares/error";
import { auth, mongoDbConnection } from "@/app/Utils/feature";

export default asyncError(async function handler(req, res) {
    if (req.method !== "GET") {
        errorHandler(res, 400, "Only GET Method is allowed.");
    }
    await mongoDbConnection();
    const user = await auth(req);
    if(!user) errorHandler(res,404,"Could not found User");
    res.status(200).json({ success:true,user});
})
