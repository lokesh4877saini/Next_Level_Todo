import { asyncError, errorHandler } from "@/app/middlewares/error";
import { User } from "@/app/model/User";
import { generateToken, mongoDbConnection,cookieSetter } from "@/app/Utils/feature";
import bcrypt from 'bcrypt';


export default asyncError(async function handler(req, res) {
    if (req.method !== "POST") {
        errorHandler(res, 400, "Only POST Method is allowed.");
    }
    await mongoDbConnection();
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return errorHandler(res, 409, "User already exists");
    }
    if (!name || !email || !password) {
        return errorHandler(res, 400, "All fields are Required");
    }
    const hashedPassowrd = await bcrypt.hash(password,10);
    user = await User.create({
        name,
        email,
        password:hashedPassowrd
    })
    const token = generateToken(user._id);
    cookieSetter(res, token, true);
    res.status(201).json({success:true, message: "Register Successfully !"});
});
