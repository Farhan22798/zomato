const { getRestaurantsForAdmin, getCustomersForAdmin, getOrdersforAdmin, registerAdminRider, getAdminRider, updateAdminRider, updateRiderAccount } = require("../controllers/admin.controller")

const router = require("express").Router()

router

  .get("/get-restaurants-admin", getRestaurantsForAdmin)
  .get("/get-customers-admin", getCustomersForAdmin)
  .get("/get-orders-admin", getOrdersforAdmin)
  .post("/register-rider",registerAdminRider)
    .get("/get-rider",getAdminRider)
    .put("/update-rider/:rid",updateAdminRider)
    .put("/update-rider-account/:rid",updateRiderAccount)
module.exports = router 