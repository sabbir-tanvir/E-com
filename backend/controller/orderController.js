
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


// Update Order Status (Admin)
export const updateOrderStatus = handelAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandelError("Order not found with this ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new HandelError("this order has already been delivered", 404));
    }

    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)
));

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order status updated successfully"
    });
});


async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        throw new HandelError("Product not found", 404);
    }
    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete Order (Admin)
export const deleteOrder = handelAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandelError("Order not found with this ID", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new HandelError("You cannot delete a delivered order", 400));
    }
    // Check if the order is already deleted
    if (order.isDeleted) {
        return next(new HandelError("Order already deleted", 400));
    }

    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
});




// 9 : 18 minutes