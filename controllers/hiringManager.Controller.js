const { createHiringManagerService, getHiringManagerService, } = require("../services/hiringManager.services")

exports.createHiringManager = async (req, res) => {
    try {
        const result = await createHiringManagerService(req.body)
        res.status(200).json({
            status: "success",
            massage: "successfully create hiring manager successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data is not inserted",
            error: error.messages
        })
    }
}

exports.getHiringManager = async (req, res, next) => {
    try {
        const manager = await getHiringManagerService();
        res.status(200).json({
            stauts: "success",
            massage: "successfully get data for Hiring Manager",
            data: manager
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Data is not found",
            error: error.message
        })
    }
}