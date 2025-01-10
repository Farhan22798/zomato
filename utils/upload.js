const multer = require("multer")

const storage = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname) },
    //destination:()=>{}
})

const restaurantUpload = multer({ storage }).fields([
    { name: "certificate", maxCount: 1 },
    { name: "hero", maxCount: 1 },
])

const menuUpload = multer({ storage }).array("image")

const updateMenuUpload = multer({ storage }).single("image")



module.exports = {
    restaurantUpload,
    menuUpload,
    updateMenuUpload
}