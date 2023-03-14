const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");


router.get("/", async (req, res) => {
  const allComments = await Comment.findAll();
  res.json(allComments);
});


router.post("/:id", async (req, res) => {
  
  if (!req.session.username) {
    const createAnonymousComment = await Comment.create({
      comment_text: `Anonymous says: ${req.body.comment_text}`,
      BlogId: req.params.id,
    });

    if (!createAnonymousComment) {
      res.status(500).json({ msg: "An error occurred!" });
    } else {
      res.status(200).json(createAnonymousComment);
    }
  } else {

    const createUserComment = await Comment.create({
      comment_text: `${req.session.username} says: ${req.body.comment_text}`,
      BlogId: req.params.id,
    });

    if (!createUserComment) {
      res.status(500).json({ msg: "An error occurred!" });
    } else {
      res.status(200).json(createUserComment);
    }
  }
});

module.exports = router;