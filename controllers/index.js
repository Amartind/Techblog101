const express = require("express");
const router = express.Router();

const frontEndControllers = require("./frontendControllers");
router.use("/", frontEndControllers);

const apiControllers = require("./api");
router.use("/api", apiControllers);

module.exports = router;