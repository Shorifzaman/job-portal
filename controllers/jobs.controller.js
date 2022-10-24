const { createJobsService, getJobsService, getJobByIdService, updateJobService } = require("../services/jobs.service")


exports.createJobs = async (req, res, next) => {
    try {
        //create method
        const result = await createJobsService(req.body)

        res.status(200).json({
            stauts: "success",
            massage: "successfully create a Jobs",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Data is not inserted",
            error: error.message
        })
    }
}

exports.getJobs = async (req, res, next) => {
    try {
        const manager = await getJobsService();
        res.status(200).json({
            stauts: "success",
            massage: "successfully get data for all jobs",
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

exports.getJobById = async (req, res, next) => {
    const { id } = req.params;
    try {
        //create method
        const job = await getJobByIdService(id);
        if (!job) {
            return res.status(400).json({
                stauts: "fail",
                error: "Could not finds a Job with this id"
            })
        }
        res.status(200).json({
            stauts: "success",
            massage: "successfully get job this ID",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Job not find this ID",
            error: error.message
        })
    }
}

exports.updateJob = async (req, res, next) => {
    const { id } = req.params;
    try {
        //create method
        const result = await updateJobService(id, req.body);
        if (!result.modifiedCount) {
            return res.status(400).json({
                stauts: "fail",
                error: "Could not find job with this id"
            })
        }
        res.status(200).json({
            stauts: "success",
            massage: "successfully update the jobs",
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Could not update",
            error: error.message
        })
    }
}