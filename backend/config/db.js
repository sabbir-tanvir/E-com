import mongoose from "mongoose";

export const connectDB = () => {

    mongoose.connect(process.env.DB_URI)
        .then((data) => {
            console.log(`MongoDB connected successfully with server ${data.connection.host}`);
        }).catch((err) => {
            console.log(err.message);
        });

}
