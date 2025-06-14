import User from "../models/userModel.js";
import HandelError from "../utils/handelError.js";
import handelAsyncError from "./handelAsyncError.js";
import jwt from "jsonwebtoken";


export const verifyUserAuth = handelAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    console.log(token);

    if (!token) {
        return next(new HandelError("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();
    
})



export const roleBasedAccess = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new HandelError(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
}





// 5: 09 min
