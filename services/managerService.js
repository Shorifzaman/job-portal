const Manager = require("../models/ManagerModel");
const User = require("../models/UserModel");

exports.createManagerService = async (data) => {
    const newManager = await Manager.create(data);
    return newManager;
};

exports.findOneManagerService = async (query) => {
    const manager = await User.find({ role: "hiring manager", ...query?.data });
    return manager;
};

exports.findAllManagerService = async (query) => {
    const allManager = await User.find({ role: "hiring manager", ...query?.data });
    return allManager;
};