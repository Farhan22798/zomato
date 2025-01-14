const asyncHandler = require("express-async-handler")
const { restaurantUpload, menuUpload, updateMenuUpload } = require("../utils/upload")
const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const cloud = require("../utils/cloudinary")
const Restaurant = require("../models/Restaurant")
const Menu = require("../models/Menu")
const path = require("path")

exports.updateInfo = asyncHandler(async (req, res) => {
    restaurantUpload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "multer error" })
        }
        //cloudinary here 
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "hero image is required" })
        }

        const { address, city, mobile, type, startTime, endTime } = req.body

        const { isError, error } = checkEmpty({ address, city, mobile, type, startTime, endTime })
        if (isError) {
            return res.status(400).json({ message: "all fileds required", error })
        }
        const image = {}
        for (const key in req.files) {
            const { secure_url } = await cloud.uploader.upload(req.files[key][0].path)
            image[key] = secure_url
        }



        console.log(req.user)
        console.log(req.body)
        console.log(req.files)

        await Restaurant.findByIdAndUpdate(req.user, { ...req.body, ...image, infoComplete: true })
        res.json({ message: "info update" })
    })
})


exports.addMenu = asyncHandler(async (req, res) => {
    menuUpload(req, res, async (err) => {


        if (!Array.isArray(req.body.type)) {
            const images = []
            for (const item of req.files) {
                const { secure_url } = await cloud.uploader.upload(item.path)
                images.push(secure_url)
            }
            await Menu.create({ ...req.body, restaurant: req.user, image: images[0] })
            res.json({ message: "menu add success" })

        } else {
            const images = []
            for (const item of req.files) {
                const { secure_url } = await cloud.uploader.upload(item.path)
                images.push(secure_url)
            }
            const result = []
            const temp = {}
            for (let i = 0; i < req.body.type.length; i++) {
                for (const key in req.body) {
                    temp[key] = req.body[key][i]
                }
                result.push({ ...temp, image: images[i], restaurant: req.user })

            }
            await Menu.create(result)

            res.json({ message: "menu add success" })
        }
    })
})

exports.getMenu = asyncHandler(async (req, res) => {
    const result = await Menu.find({ restaurant: req.user })
    res.json({ message: "menu fetch success", result })
})

exports.deleteMenu = asyncHandler(async (req, res) => {
    //delete image from cloudinary
    const result = await Menu.findById(req.params.mid)
    await cloud.uploader.destroy(path.basename(result.image, path.extname(result.image)))
    await Menu.findByIdAndDelete(req.params.mid)
    res.json({ message: "menu delete success" })
})

exports.updateMenu = asyncHandler(async (req, res) => {
    try {

        updateMenuUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "multer error" })
            }
            if (req.file) {
                const result = await Menu.findById(req.params.mid)
                //delete old image
                await cloud.uploader.destroy(path.basename(result.image, path.extname(result.image)))
                //upload new image
                const { secure_url } = await cloud.uploader.upload(req.file.path)
                //update database
                await Menu.findByIdAndUpdate(req.params.mid, { ...req.body, image: secure_url })
                res.json({ message: "menu update success" })

            } else {
                await Menu.findByIdAndUpdate(req.params.mid, { ...req.body })
                res.json({ message: "menu update success" })

            }
        })
    } catch (error) {
        console.log(error)
    }
})


//menu crud




exports.getRestaurants = asyncHandler(async (req, res) => {
    const result = await Restaurant.find()
    res.json({ message: "restaurant fetch success", result })
})


