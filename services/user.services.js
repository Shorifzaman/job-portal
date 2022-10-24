const User = require("../models/UserModel");


exports.createUserService = async (userInfo) => {
    const category = await User.create(userInfo)
    return category;
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email })
}