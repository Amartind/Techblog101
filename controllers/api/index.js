const express = require("express");
const router = express.Router();

const blogController = require("./blogController");
router.use("/blog", blogController);

const userController = require("./userController");
router.use("/users", userController);

const commentController = require("./commentController");
router.use("/comments", commentController);

module.exports = router;