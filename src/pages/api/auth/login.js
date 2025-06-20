import { asyncError, errorHandler } from "@/app/middlewares/error";
import { User } from "@/app/model/User";
import { generateToken, mongoDbConnection,cookieSetter } from "@/app/Utils/feature";
import bcrypt from 'bcrypt';


export default asyncError(async function handler(req, res) {
    if (req.method !== "POST") {
        errorHandler(res, 400, "Only POST Method is allowed.");
    }
    await mongoDbConnection();
    const {email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return errorHandler(res, 409, "User don't exists");
    }
    if (!email || !password) {
        return errorHandler(res, 400, "All Fields Are Required");
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        return errorHandler(res, 403, "Credentials Are Incorrect");
    }
    const token = generateToken(user._id);
    cookieSetter(res, token, true);
    res.status(200).json({success:true, message: `${user.name} Welcome Back !!`, user });
});
