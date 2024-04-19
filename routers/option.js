const express = require("express");
const router = express.Router();
const optionController = require("../controllers/option");
const { authMiddleware } = require("../middlewares/auth");

router
    .route("/")
    .get(authMiddleware(["admin", "user"]), optionController.getAllOptions)
    .post(authMiddleware(["admin"]), optionController.createOption);

router
    .route("/:id")
    .get(authMiddleware(["admin", "user"]), optionController.getOptionById)
    .put(authMiddleware(["admin", "user"]), optionController.updateOption)
    .delete(authMiddleware(["admin", "user"]), optionController.deleteOption);

module.exports = router;
