const express = require("express");
const router = express.Router();
const carSpecController = require("../controllers/car_spec");
const { authMiddleware } = require("../middlewares/auth");

router
    .route("/")
    .get(authMiddleware(["admin", "user"]), carSpecController.getAllCarSpecs)
    .post(authMiddleware(["admin"]), carSpecController.createCarSpec);

router
    .route("/:id")
    .get(authMiddleware(["admin", "user"]), carSpecController.getCarSpecById)
    .put(authMiddleware(["admin"]), carSpecController.updateCarSpec)
    .delete(authMiddleware(["admin"]), carSpecController.deleteCarSpec);

module.exports = router;
