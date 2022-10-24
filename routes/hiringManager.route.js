const express = require("express");
const router = express.Router()
const hiringManagerController = require('../controllers/hiringManager.Controller');


router.route('/')
    .post(hiringManagerController.createHiringManager)
    .get(hiringManagerController.getHiringManager)


module.exports = router;