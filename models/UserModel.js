const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "Please Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email is required."],
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password {VALUE} is not strong enough!",
            },
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords does not match!",
            },
        },

        role: {
            type: String,
            enum: ["hiring manager", "candidate", "admin"],
            default: "candidate",
        },

        name: {
            type: String,
            required: [true, "Please provide your name."],
            trim: true,
            minLength: [2, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too long!!!"],
        },

        contactNumber: {
            type: String,
            validate: [
                validator.isMobilePhone,
                "Please provide a valid contact number",
            ],
        },
        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        jobs: [
            {
                title: String,
                id: {
                    type: ObjectId,
                    ref: "Job",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;