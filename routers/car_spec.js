const express = require("express");
const router = express.Router();
const carSpecController = require("../controllers/car_spec");

router
    .route("/")
    .get(carSpecController.getAllCarSpecs)
    .post(carSpecController.createCarSpec);

router
    .route("/:id")
    .get(carSpecController.getCarSpecById)
    .put(carSpecController.updateCarSpec)
    .delete(carSpecController.deleteCarSpec);

module.exports = router;
