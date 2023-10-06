const express = require("express");
const coinController = require("../controllers/controller");

const router = express.Router();

router.get("/events", coinController.events);
router.get("/getPrice", coinController.getPrice);
router.get("/updatePrice", coinController.updatePrice);

module.exports = router;
