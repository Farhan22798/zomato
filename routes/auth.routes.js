const { registerAdmin, loginAdmin, verifyAdminOTP, logoutAdmin, registerRestaurant, loginRestaurant, logoutRestaurant, registerCustomer, loginCustomer, verifyCustomerOTP, logoutCustomer, loginRider, logoutRider } = require("../controllers/auth.controller")

const router = require("express").Router()

router

    .post("/register-admin", registerAdmin)
    .post("/register-restaurant", registerRestaurant)
    .post("/register-customer", registerCustomer)
    .post("/login-admin", loginAdmin)
    .post("/login-customer", loginCustomer)
    .post("/login-restaurant", loginRestaurant)
    .post("/login-rider", loginRider)
    .post("/verify-admin-otp", verifyAdminOTP)
    .post("/verify-customer-otp", verifyCustomerOTP)
    .post("/logout-admin", logoutAdmin)
    .post("/logout-restaurant", logoutRestaurant)
    .post("/logout-customer", logoutCustomer)
    .post("/logout-rider", logoutRider)

module.exports = router 