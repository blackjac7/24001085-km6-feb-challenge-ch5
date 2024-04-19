const express = require("express");
const router = express.Router();
const specController = require("../controllers/spec");
const { authMiddleware } = require("../middlewares/auth");

router
    .route("/")
    .get(authMiddleware(["admin", "user"]), specController.getAllSpecs)
    .post(authMiddleware(["admin"]), specController.createSpec);

router
    .route("/:id")
    .get(authMiddleware(["admin", "user"]), specController.getSpecById)
    .put(authMiddleware(["admin"]), specController.updateSpec)
    .delete(authMiddleware(["admin"]), specController.deleteSpec);

module.exports = router;
