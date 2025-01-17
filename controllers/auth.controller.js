const asyncHandler = require("express-async-handler")
const validator = require("validator")
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const { generateOTP } = require("../utils/otp")
const { sendEmail } = require("../utils/email")
const jwt = require("jsonwebtoken")
const { differenceInSeconds } = require("date-fns")
const { sendSMS } = require("../utils/sms")
const Restaurant = require("../models/Restaurant")
const Customer = require("../models/Customer")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body
    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(mobile)) {
        return res.status(400).json({ message: "all fields required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid email" })

    }

    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "invalid mobile" })

    }

    await Admin.create({ name, email, mobile })
    res.json({ message: "admin register succes" })

})

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { username } = req.body

    const result = await Admin.findOne({ $or: [{ email: username }, { mobile: username }] })

    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }

    //send OTP 
    const otp = generateOTP()

    await Admin.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
    // await sendSMS({ number: result.mobile, message: `Your OTP is ${otp}` })

    await sendEmail({
        message: `<h1>Your OTP is ${otp}</h1>`,
        subject: "verify otp to login",
        to: result.email
    })

    res.json({ message: "otp sent" })

})

exports.verifyAdminOTP = asyncHandler(async (req, res) => {
    const { otp, username } = req.body
    const result = await Admin.findOne({ $or: [{ email: username }, { mobile: username }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }

    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await Admin.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: " otp expired" })

    }

    await Admin.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    res.cookie("zomato-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "login success", result: {
            name: result.name,
            email: result.email
        }
    })
})

exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("zomato-admin")
    res.json({ message: "logout success" })
})


exports.registerRestaurant = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const isFound = await Restaurant.findOne({ email }) // object
    if (isFound) {
        return res.status(409).json({ message: "email already exist, please use another email" })
    }
    const hash = await bcrypt.hash(password, 10)

    await Restaurant.create({ ...req.body, password: hash })
    res.status(201).json({ message: "restaurant register success", result: req.body })


})

exports.loginRestaurant = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await Restaurant.findOne({ email }) // object
    if (!result) {
        return res.status(409).json({ message: "email does not exist, please regsiter" })
    }
    const isVerify = await bcrypt.compare(password, result.password)

    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials pwd" })

    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    res.cookie("restaurant", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
       
    })

    res.json({
        message: "restaurant login success", result: {
            _id: result._id,
            restaurantName: result.restaurantName,
            email: result.email,
            infoComplete: result.infoComplete
        }
    })

})

exports.logoutRestaurant = asyncHandler(async (req, res) => {
    res.clearCookie("restaurant")
    res.json({ message: "restaurant logout success" })
})

exports.registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body
    const isFound = await Customer.findOne({
        $or: [
            { mobile },
            { email }
        ]
    })
    if (isFound) {
        return res.status(409).json({ message: "email or mobile already exist, please use another one" })
    }

    await Customer.create(req.body)
    res.status(201).json({ message: "customer register success" })


})

exports.loginCustomer = asyncHandler(async (req, res) => {
    const { username } = req.body

    const result = await Customer.findOne({ $or: [{ email: username }, { mobile: username }] })

    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }

    //send OTP 
    const otp = generateOTP()

    await Customer.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })
    // await sendSMS({ number: result.mobile, message: `Your OTP is ${otp}` })

    await sendEmail({
        message: `<h1>Your OTP is ${otp}</h1>`,
        subject: "verify otp to login",
        to: result.email
    })

    res.json({ message: "otp sent" })


})


exports.verifyCustomerOTP = asyncHandler(async (req, res) => {
    const { otp, username } = req.body
    const result = await Customer.findOne({ $or: [{ email: username }, { mobile: username }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }

    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await Customer.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: " otp expired" })

    }

    await Customer.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "365d" })

    res.cookie("zomato-customer", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "login success", result: {
            name: result.name,
            email: result.email,
            mobile: result.mobile,
            infoComplete: result.infoComplete
        }
    })
})


exports.logoutCustomer = asyncHandler(async (req, res) => {
    res.clearCookie("zomato-customer")
    res.json({ message: "logout success" })
})