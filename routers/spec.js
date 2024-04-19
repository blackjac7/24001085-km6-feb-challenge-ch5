const express = require("express");
const router = express.Router();
const specController = require("../controllers/spec");

router
    .route("/")
    .get(specController.getAllSpecs)
    .post(specController.createSpec);

router
    .route("/:id")
    .get(specController.getSpecById)
    .put(specController.updateSpec)
    .delete(specController.deleteSpec);

module.exports = router;
