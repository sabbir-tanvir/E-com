
import mongoose  from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo:{
        address:{
            type: String,
            require: true
        },
        city:{
            type: String,
            require: true
        },
        state:{
            type: String,
            require: true
        },
        country:{
            type: String,
            require: true
        },
        pincode:{
            type: String,
            require: true
        }
    },
    orderItems:[
        {
            name:{
                type: String,
                require: true
            },
            price:{
                type: Number,
                require: true
            },
            quantity:{
                type: Number,
                require: true
            },
            image:{
                type: String,
                require: true
            },
            product:{
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                require: true
            }
        }
    ],
    orderStatus:{
        type: String,
        require: true,
        default: "Processing"
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    paymentInfo:{
        id:{
            type: String,
            require: true
        },
        status:{
            type: String,
            require: true
        }
    },
    paidAt:{
        type: Date,
        default: Date.now
    },
    itemsPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    taxPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        require: true,
        default: 0.0
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Order", orderSchema);


// 8: 25 min