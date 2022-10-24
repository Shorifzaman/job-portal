const express = require("express");
const router = express.Router()
const jobsController = require('../controllers/jobs.controller');
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.post('/job', jobsController.createJobs)
router.get('/manager/jobs', verifyToken, jobsController.getJobs)
router.get('/manager/job/:id', verifyToken, authorization("Hiring-Manager", "Admin"), jobsController.getJobById)
router.patch('/job/:id', jobsController.updateJob)


module.exports = router;