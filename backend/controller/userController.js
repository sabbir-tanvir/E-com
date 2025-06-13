import handelAsyncError from "../middleware/handelAsyncError.js";
import User from "../models/userModel.js";
import HandelError from "../utils/handelError.js";
import { sentToken } from "../utils/jetToken.js";


// Resister the user 

export const registeruser = handelAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "sample_id",
            url: "sample_url"
        }
    });
    sentToken(user,201, res)

})

// Login the user 

export const LoginUser = handelAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HandelError("Email or Password is cant be empty ", 400))

    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new HandelError("Invalid Email or Password", 401))
    }



    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        return next(new HandelError("Invalid Email or Password", 401))
    }

    sentToken(user,200, res)

})



export const logout = handelAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})
