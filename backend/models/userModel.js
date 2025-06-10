import mongoose  from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxLength: [25, "Invalid Name "],
        minLenght: [3, "Name should contain more than 3 charecter"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , "Plese enter the correct email formet"]
    },
    password: {
        type: String,
        required: [true, "Plese Enter the password"],
        minLength: [5, "Password should be more than 5"],
        select: false

    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{timestamps: true});





// Password hashing middleware
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

    if(!this.isModified("password")){
        return next();
    }
}) 


userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.verifyPassword =async function (userEnterPassword) {

    return await bcrypt.compare(userEnterPassword, this.password);

}

export default mongoose.model("User", userSchema);


// 4: 10 minutes

