const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const { io } = require("../socket/socket")


exports.getRiderOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ rider: req.user, status: { $ne: "Delivered" } })
        .select(("-rider -createdAt -updatedAt -__v "))
        .populate("restaurant", "restaurantName address hero mobile") //joins
        .populate("items.dish", "name type image price") //joins
        .populate("customer", "name address mobile") //joins
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})

exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    io.emit("order-statuss")
    await Order.findByIdAndUpdate(oid, { status: req.body.status })
    res.json({ message: "order status update success" })
})

exports.getRiderOrdersHistory = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ rider: req.user, status: "Delivered" })
        .select(("-rider -createdAt -updatedAt -__v "))
        .populate("restaurant", "restaurantName address hero mobile") //joins
        .populate("items.dish", "name type image price") //joins
        .populate("customer", "name address mobile") //joins
        .sort({ createdAt: -1 })
    res.json({ message: "order fetch success", result })
})


