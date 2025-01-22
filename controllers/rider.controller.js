const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")


exports.getRiderOrders = asyncHandler(async (req, res) => {
    const result = await Order
        .find({ rider: req.user })
        .select(("-rider -createdAt -updatedAt -__v "))
        .populate("restaurant", "restaurantName hero") //joins
        .populate("items.dish", "name type image price") //joins
        .sort({createdAt:-1})
    res.json({ message: "order fetch success", result })
})


