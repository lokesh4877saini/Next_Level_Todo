import mongoose from 'mongoose';
import { serialize } from 'cookie';
import { User } from '../model/User';
import jwt from "jsonwebtoken";
let isConnected = false;

export const mongoDbConnection = async () => {
    if (isConnected) return;
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('------- MongoDB connected -------');
    } catch (err) {
        console.error(' MongoDB connection error:', err);
        throw err;
    }
};

export const cookieSetter = (res, token, wanttoSet) => {
    res.setHeader(
        "Set-Cookie",
        serialize("token", wanttoSet ? token : "", {
            path: "/",
            httpOnly: true,
            sameSite: 'lax',
            maxAge: wanttoSet ? 24 * 60 * 60 : 0, // 1 day
        })
    );
}

export const generateToken = (_id) => {
    return jwt.sign({ _id: _id.toString() }, process.env.JWT_SECRET)
}

export const auth = async (req) => {
    try {
        const cookies = req.headers.cookie;
        if (!cookies) return null;

        const token = cookies.split("=")[1];
        if (!token || token === "undefined") return null;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) return null;

        return user;
    } catch (err) {
        console.error("Auth error:", err.message);
        return null;
    }
};