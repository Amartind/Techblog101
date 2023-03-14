const express = require("express");
const router = express.Router();

const frontEndControllers = require("./frontendController");
router.use("/", frontEndControllers);

const apiControllers = require("./api");
router.use("/api", apiControllers);

module.exports = router;