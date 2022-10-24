const mongoose = require("mongoose");
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types


const candidateSchema = mongoose.Schema({
    candidateName: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [3, "Name mast be 3 characters"],
        maxLength: [100, "Name is too larges"],
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid Email"],
        unique: true,
        require: [true, "Email address is Require"],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },
    address: {
        type: String,
        require: true
    },
    highestEducation: {
        type: String,
        require: true
    },
    applyForm: {
        name: String,
        id: {
            type: ObjectId,
            ref: "Jobs",
            require: true,
        }
    },
    uploadResume: {
        type: String,
    }

})

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;