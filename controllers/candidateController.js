
const { getCandidateJobsService, getCandidateJobByIdService, applyJobsService } = require("../services/candidate.services");
const { getJobByIdService } = require("../services/jobs.service");


exports.getJobs = async (req, res, next) => {
    try {
        //find by id
        let filters = { ...req.query }
        //solt,page,limit, --- exclude
        const excludeField = ['sort', 'page', 'limit']
        excludeField.forEach(field => delete filters[field])

        //gt,li,get,lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|Lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filterString)
        console.log(JSON.parse(filterString))


        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
        }
        //
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }
        const manager = await getCandidateJobsService(filters, queries);
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
        const job = await getCandidateJobByIdService(id);
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

exports.applyJobs = async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await getJobByIdService(id);
        console.log(job.lastApplicationDate, new Date())
        if (job.lastApplicationDate < new Date()) {
            return res.status(401).json({
                stauts: "fail",
                error: "Can’t apply after deadline",
            })
        }
        const result = await applyJobsService(req.body)
        res.status(200).json({
            stauts: "success",
            massage: "successfully Apply a Jobs",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            stauts: "fail",
            message: "Apply is not inserted",
            error: error.message
        })
    }
}