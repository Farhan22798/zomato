const { getRestaurantsForAdmin, getCustomersForAdmin, getOrdersforAdmin, registerAdminRider, getAdminRider, updateAdminRider, updateRiderAccount, getAdminActiveRiders, assignRider, updateCustomerAccount } = require("../controllers/admin.controller")

const router = require("express").Router()

router

  .get("/get-restaurants-admin", getRestaurantsForAdmin)
  .get("/get-customers-admin", getCustomersForAdmin)
  .get("/get-orders-admin", getOrdersforAdmin)
  .post("/register-rider",registerAdminRider)
    .get("/get-rider",getAdminRider)
    .get("/get-active-riders",getAdminActiveRiders)
    .put("/update-rider/:rid",updateAdminRider)
    .put("/update-rider-account/:rid",updateRiderAccount)
    .put("/update-customer-account/:cid",updateCustomerAccount)
    .put("/assign-rider/:oid",assignRider)
module.exports = router 