const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB , {
        useNewUrlParser: true,
    }).then((c) => {
        console.log(`[DATABASE]`.yellow, `MONGODB DATABASE CONNECTED`)
    })
};

module.exports = connectDB; 