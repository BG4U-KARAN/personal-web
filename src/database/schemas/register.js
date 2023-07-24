const {model, Schema} = require("mongoose");

const register = new Schema({
    Id: Number,
    email: String,
    password: String,
});

module.exports = model("register", register)