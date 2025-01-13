const asyncHandler = require("express-async-handler")
const axios = require("axios")
const { checkEmpty } = require("../utils/checkEmplty")
const Customer = require("../models/Customer")

exports.getLocation = asyncHandler(async (req, res) => {
    const { latitude, longitude } = req.body;

    // Check for empty fields
    const { isError, error } = checkEmpty({ latitude, longitude });
    if (isError) {
        return res.status(400).json({ message: "All fields are required", error });
    }

    try {
        // Fetch location data from OpenCage
        const { data } = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${process.env.CAGE_API_KEY}`
        );

        console.log("OpenCage Response:", JSON.stringify(data, null, 2));

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ message: "No location data found" });
        }

        // Construct address
        let str = "";
        const city = data.results[0]?.components?.city || "Unknown City";
        str += data.results[0]?.components?.road || "";
        str += " " + (data.results[0]?.components?.neighbourhood || "");
        str += " " + (data.results[0]?.components?.suburb || "");
        str += " " + (data.results[0]?.components?.city || "");
        str += " " + (data.results[0]?.components?.postcode || "");

        // Send response
        return res.json({
            message: "Location fetch success",
            result: {
                address: str.trim(),
                city,
            },
        });
    } catch (error) {
        console.error("Error fetching location data:", error.message);
        return res.status(500).json({ message: "Error fetching location data", error: error.message });
    }
});


exports.updateCustomerInfo = asyncHandler(async (req, res) => {
    const { address, city, gender } = req.body
    const { isError, error } = checkEmpty({ address, city, gender })
    if (isError) {
        return res.status(400).json({ message: "all flieds required", error })
    }
    const result = await Customer.findByIdAndUpdate(req.user, {
        address,
        city,
        gender,
        infoComplete: true
    }, { new: true })

    res.json({ message: "profile update success", result })


})