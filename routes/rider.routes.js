const { getRiderOrders,   updateOrderStatus, getRiderOrdersHistory } = require("../controllers/rider.controller")

const router = require("express").Router()

router

  .get("/get-orders-rider", getRiderOrders)
  .get("/get-orders-history-rider", getRiderOrdersHistory)
  .put("/update-order-status/:oid", updateOrderStatus)
  
module.exports = router 