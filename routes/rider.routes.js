const { getRiderOrders } = require("../controllers/rider.controller")

const router = require("express").Router()

router

  .get("/get-orders-rider", getRiderOrders)
  
module.exports = router 