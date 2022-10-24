const express = require("express");
const router = express.Router()

const candidateController = require('../controllers/candidateController');
const uploader = require("../middleware/fileUploader");

router.get('/jobs', candidateController.getJobs)
router.get('/job/:id', candidateController.getJobById)
router.post('/job/:id/apply', candidateController.applyJobs)

module.exports = router;