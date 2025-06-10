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


// 5: 09 min
