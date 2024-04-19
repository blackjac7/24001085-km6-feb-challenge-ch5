const express = require("express");
const router = express.Router();
const carController = require("../controllers/car");

router.route("/").get(carController.getAllCars).post(carController.createCar);

router
    .route("/:id")
    .get(carController.getCarById)
    .put(carController.updateCar)
    .patch(carController.updateCar)
    .delete(carController.deleteCar);

router.route("/:id/options").get(carController.getAllCarOptions);

router.route("/:id/specs").get(carController.getAllCarSpecs);

module.exports = router;
