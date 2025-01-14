const { updateInfo, addMenu, getMenu, updateMenu, deleteMenu, getRestaurants } = require("../controllers/restaurant.controller")

const router= require("express").Router()

router

.post("/update-info",updateInfo)
.post("/add-menu",addMenu)
.get("/get-menu",getMenu)
.get("/get-restaurants",getRestaurants)
.put("/update-menu/:mid",updateMenu)
.delete("/delete-menu/:mid",deleteMenu )


module.exports=router