const { getLocation, updateCustomerInfo, getRestaurants, getRestaurantMenu } = require("../controllers/customer.controllers")

const router = require("express").Router()

router
    .post("/get-location", getLocation)
    .post("/update-info", updateCustomerInfo)
    .get("/get-restaurants",getRestaurants)
.get("/get-restaurant-menu/:rid",getRestaurantMenu)



module.exports = router