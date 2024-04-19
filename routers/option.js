const express = require("express");
const router = express.Router();
const optionController = require("../controllers/option");

router
    .route("/")
    .get(optionController.getAllOptions)
    .post(optionController.createOption);

router
    .route("/:id")
    .get(optionController.getOptionById)
    .put(optionController.updateOption)
    .delete(optionController.deleteOption);

module.exports = router;
