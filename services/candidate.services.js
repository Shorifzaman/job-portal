const Candidate = require("../models/CandidateModel");
const Jobs = require("../models/JobModel");

exports.getCandidateJobsService = async (filters, queries) => {
    const jobs = await Jobs.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
        .select(queries.fields)
        .populate("hiringManager.id")
    return jobs;
}

exports.getCandidateJobByIdService = async (id) => {
    const job = await Jobs.findOne({ _id: id })
        .populate("hiringManager.id")
    return job;
}

exports.applyJobsService = async (data) => {
    const result = await Candidate.create(data)
    return result;
}