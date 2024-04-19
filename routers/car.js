const express = require("express");
const router = express.Router();
const carController = require("../controllers/car");
const { authMiddleware } = require("../middlewares/auth");

router
    .route("/")
    .get(authMiddleware(["admin", "user"]), carController.getAllCars)
    .post(authMiddleware(["admin"]), carController.createCar);

router
    .route("/:id")
    .get(authMiddleware(["admin", "user"]), carController.getCarById)
    .put(authMiddleware(["admin"]), carController.updateCar)
    .delete(authMiddleware(["admin"]), carController.deleteCar);

router
    .route("/:id/options")
    .get(authMiddleware(["admin"]), carController.getAllCarOptions);

router
    .route("/:id/specs")
    .get(authMiddleware(["admin"]), carController.getAllCarSpecs);

module.exports = router;
