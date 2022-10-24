const mongoose = require("mongoose");
const validator = require('validator');


const hiringManagerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this hiring Manager"],
        trim: true,
        lowercase: true,
        minLength: [3, "Name mast be 3 characters"],
        maxLength: [100, "Name is too larges"],
    },
    designation: {
        type: String,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        validator: [validator.isEmail, "Please provide a valid Email"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },
    company: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        minLength: [3, "Name mast be 3 characters"],
        maxLength: [100, "Name is too larges"],
    }

})

const HiringManager = mongoose.model('HiringManager', hiringManagerSchema);

module.exports = HiringManager;