const { updateInfo, addMenu, getMenu, updateMenu, deleteMenu, getRestaurantOrders, updateRestaurantStatus } = require("../controllers/restaurant.controller")

const router= require("express").Router()

router

.post("/update-info",updateInfo)
.post("/add-menu",addMenu)
.get("/get-menu",getMenu)
.put("/update-menu/:mid",updateMenu)
.delete("/delete-menu/:mid",deleteMenu )

.get("/get-orders",getRestaurantOrders)
.put("/change-status/:oid",updateRestaurantStatus)

module.exports=router