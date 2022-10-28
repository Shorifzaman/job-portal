const mongoose = require("mongoose");
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const candidateSchema = mongoose.Schema(
    {
        candidateName: {
            type: String,
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
        uploadResume: {
            type: String,
        },
        skills: {
            type: String,
            trim: true,
            required: [true, "Candidate name is required."],
            maxLength: 300,
            unique: true,
            lowercase: true,
        },
        user: {
            id: {
                type: ObjectId,
                ref: "User",
            },
        },
        appliedInfo: [
            {
                type: ObjectId,
                ref: "AppliedInfo",
            },
        ],
        jobs: [
            {
                type: ObjectId,
                ref: "Job",
            },
        ],
        apllyDate: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;