const mongoose = require("mongoose");

//create schema
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    identityNumber: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("User", UserSchema);