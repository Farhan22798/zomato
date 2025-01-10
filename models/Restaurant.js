const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    mobile: { type: String },
    certificate: { type: String },
    type: { type: String, enum: ["veg", "non-veg"] },
    hero: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    isActive: { type: Boolean, default: false },
    infoComplete: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("restaurant", restaurantSchema)