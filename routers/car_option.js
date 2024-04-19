const express = require("express");
const router = express.Router();
const carOptionController = require("../controllers/car_option");

router
    .route("/")
    .get(carOptionController.getAllCarOptions)
    .post(carOptionController.createCarOption);

router
    .route("/:id")
    .get(carOptionController.getCarOptionById)
    .put(carOptionController.updateCarOption)
    .delete(carOptionController.deleteCarOption);

module.exports = router;
