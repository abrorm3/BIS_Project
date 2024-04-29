const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.get("/", applicationController.getApplications);
router.post("/create", applicationController.createApplication);

module.exports = router;
