const express = require("express");
const controller = require("../controllers/boothController");
const router = express.Router();

router.get("/get", controller.fetchBooths);
router.get("/getOne/:id", controller.fetchBooth);
router.get("/getBusinessTypes", controller.getAllBusinessTypes);
module.exports = router;
