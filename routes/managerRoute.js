const express = require('express');
const managerController = require("../controllers/managerController");
const { verifyToken } = require('../middleware/verifyToken');
const authorization = require('../utils/authorization');

const router = express.Router();

router
    .route('/')
    .get(managerController.findAllManager)
    .post(managerController.createManager)

router
    .get('/jobs', verifyToken, authorization('hiring manager'), managerController.selectedManagerJobs)

router
    .get('/jobs/:id', verifyToken, authorization('hiring manager'), managerController.selectedManagerJobById)

router
    .route('/:id')
    .get(managerController.findManagerById)

module.exports = router