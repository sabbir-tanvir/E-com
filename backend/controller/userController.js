import handelAsyncError from "../middleware/handelAsyncError.js";
import User from "../models/userModel.js";
import HandelError from "../utils/handelError.js";
import { sentToken } from "../utils/jetToken.js";
import { sendEmail } from "../utils/sendEmail.js";


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
    sentToken(user, 201, res)

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

    sentToken(user, 200, res)

})


// LLogout the user


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


// Reset the password 

export const resetPassword = handelAsyncError(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new HandelError("Please enter your email", 400))
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new HandelError("User not found with this email", 404))
    }

    // Generate reset token
    let resetToken;

    try {
        resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
    }
    catch (error) {
        return next(new HandelError("Error generating reset token", 500));
    }
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this, please ignore this message.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new HandelError(error.message, 500));
    }
});

