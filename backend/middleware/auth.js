import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export function signToken(userId){
    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error("JWT_SECRET is not set.");
    return jwt.sign({sub:userId} ,secret , {
        expiresIn:process.env.JWT_EXPIRES_IN || "30d"
    });


}

//to check wether user logged in or not 
export async function requireAuth(req,res,next){
    try{
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;
        if(!token) return res.status(401).json({error: "Missing token"});

        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(payload.sub);
        if(!user) return res.status(401).json({error:"User not found"});
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({error:"Invalid or expired token"});
    }
}

//if
export async function optionalAuth(req,res,next) {
    try{
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null; 
        if(token){
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(payload.sub);
            if(user) req.user = user;
        }
    }
    catch{
        //invalid token and ignore the error occured
    }
    next();
    
}