const { registerAdmin, loginAdmin, verifyAdminOTP, logoutAdmin, registerRestaurant, loginRestaurant, logoutRestaurant, registerCustomer, loginCustomer, verifyCustomerOTP, logoutCustomer } = require("../controllers/auth.controller")

const router = require("express").Router()

router

    .post("/register-admin", registerAdmin)
    .post("/register-restaurant", registerRestaurant)
    .post("/register-customer", registerCustomer)
    .post("/login-admin", loginAdmin)
    .post("/login-customer", loginCustomer)
    .post("/login-restaurant", loginRestaurant)
    .post("/verify-admin-otp", verifyAdminOTP)
    .post("/verify-customer-otp", verifyCustomerOTP)
    .post("/logout-admin", logoutAdmin)
    .post("/logout-restaurant", logoutRestaurant)
    .post("/logout-customer", logoutCustomer)

module.exports = router 