import handelAsyncError from "../middleware/handelAsyncError.js";
import User from "../models/userModel.js";
import HandelError from "../utils/handelError.js";
import { sentToken } from "../utils/jetToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";


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


// Forgot the password 

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


// Reset the password

export const resetPasswordConfirm = handelAsyncError(async (req, res, next) => {

    const { password, confirmPassword } = req.body;

    // if (!token || !password) {
    //     return next(new HandelError("Please provide token and new password", 400));
    // }

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new HandelError("Reset token is invalid or has expired", 400));
    }

    if (password !== confirmPassword) {
        return next(new HandelError("Passwords do not match", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sentToken(user, 200, res);
});


// get user details 

export const getUserDEtails = handelAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })

})


// update the password

export const updatePassword = handelAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    const chekPasswordMatch = await user.verifyPassword(oldPassword);

    if (!chekPasswordMatch) {
        return next(new HandelError(`old password is incorrect `, 400))
    }
    if (newPassword !== confirmPassword) {
        return next(new HandelError("New password and confirm password do not match", 400));
    }
    user.password = newPassword;
    await user.save();

    sentToken(user, 200, res);
})



// update the user profile
export const updateProfile = handelAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // Update avatar if provided
    // if (req.body.avatar) {
    //     newUserData.avatar = {
    //         public_id: "sample_id", // Replace with actual public_id from cloud storage
    //         url: req.body.avatar // URL of the uploaded avatar image
    //     };
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    });
});



// Get all users (Admin only)

export const getAllUsers = handelAsyncError(async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(new HandelError("No users found", 404));
    }
    res.status(200).json({
        success: true,
        users
    });
})

// admin getting single user details
export const getSingleUserDetails = handelAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandelError("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});


// Admin changing user role
export const updateUserRole = handelAsyncError(async (req, res, next) => {
    const { role } = req.body;
    const newUserData = {
        role: role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        // useFindAndModify: false
    });

    if (!user) {
        return next(new HandelError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user
    });
});


// admin deleting user
export const deleteUser = handelAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandelError("User not found", 404));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});



// 7: 34 