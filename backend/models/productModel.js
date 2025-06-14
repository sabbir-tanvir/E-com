import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    description:{
        type: String,
        required: [true, "Please enter product description"],
        maxLength: [500, "Product description cannot exceed 500 characters"]
    },
    price:{
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [5, "Product price cannot exceed 5 digits"],
        default: 0.0
    },
    ratings:{
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [5, "Product stock cannot exceed 5 digits"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Product",productSchema)
