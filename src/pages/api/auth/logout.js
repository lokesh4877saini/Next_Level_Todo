import { asyncError, errorHandler } from "@/app/middlewares/error";
import { cookieSetter } from "@/app/Utils/feature";


export default asyncError(async function handler(req, res) {
    if (req.method !== "GET") {
        errorHandler(res, 400, "Only GET Method is allowed.");
    }
    
    cookieSetter(res, null, false);
    res.status(200).json({ 
        success:true,
        message: "Logged Out Successfully !"});
});
