const HiringManager = require("../models/HrManagerModel");


exports.createHiringManagerService = async (data) => {
    const result = await HiringManager.create(data)
    return result;
}

exports.getHiringManagerService = async () => {
    const hrManager = await HiringManager.find({})
    return hrManager;
}