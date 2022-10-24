const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router
    .route("/")
    .get(candidateController.findAllCandidate)
    .post(candidateController.createCandidate);

module.exports = router;