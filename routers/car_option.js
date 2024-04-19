const express = require("express");
const router = express.Router();
const carOptionController = require("../controllers/car_option");
const { authMiddleware } = require("../middlewares/auth");

router
    .route("/")
    .get(
        authMiddleware(["admin", "user"]),
        carOptionController.getAllCarOptions
    )
    .post(authMiddleware(["admin"]), carOptionController.createCarOption);

router
    .route("/:id")
    .get(
        authMiddleware(["admin", "user"]),
        carOptionController.getCarOptionById
    )
    .put(authMiddleware(["admin"]), carOptionController.updateCarOption)
    .delete(authMiddleware(["admin"]), carOptionController.deleteCarOption);

module.exports = router;
