const express = require("express");
const router = express.Router();
const carRouter = require("./car");
const optionRouter = require("./option");
const specRouter = require("./spec");
const carOptionRouter = require("./car_option");
const carSpecRouter = require("./car_spec");

router.use("/cars", carRouter);
router.use("/options", optionRouter);
router.use("/specs", specRouter);
router.use("/car-options", carOptionRouter);
router.use("/car-specs", carSpecRouter);

module.exports = router;
