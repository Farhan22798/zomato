const { getLocation, updateCustomerInfo, getRestaurants, getRestaurantMenu, placeOrder, getOrders } = require("../controllers/customer.controllers")

const router = require("express").Router()

router
    .post("/get-location", getLocation)
    .post("/update-info", updateCustomerInfo)
    .get("/get-restaurants",getRestaurants)
    .get("/get-restaurant-menu/:rid",getRestaurantMenu)
    .post("/place-order", placeOrder)
    .get("/fetch-orders", getOrders)



module.exports = router