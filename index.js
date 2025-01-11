const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { restaurantProtected, customerProtected } = require("./midllewares/protected")

const app = express()

app.use(express.json()) // req.body
app.use(cookieParser()) // req.cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/restaurant", restaurantProtected, require("./routes/restaurant.route"))
app.use("/api/customer", customerProtected, require("./routes/customer.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "reource not found" })
})
// express error handler
app.use((err, req, res, next) => {

    console.log(err)
    return res.status(500).json({ message: "server error" })

})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT || 5000, console.log("server running"))
})
