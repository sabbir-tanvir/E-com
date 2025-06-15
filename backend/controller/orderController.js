
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

import handelAsyncError from "../middleware/handelAsyncError.js";
import HandelError from "../utils/handelError.js";


// Create Order
export const createOrder = handelAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
});


// getting single order
export const getSingleOrder = handelAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new HandelError("Order not found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// All my orders
export const myOrders = handelAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new HandelError("No orders found for this user", 404));
    }

    res.status(200).json({
        success: true,
        orders
    });
});


// Getting all orders (Admin)
export const getAllOrders = handelAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    if (!orders) {
        return next(new HandelError("No orders found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});