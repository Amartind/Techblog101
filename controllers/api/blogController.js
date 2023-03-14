const express = require("express");
const { where } = require("sequelize");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({ include: [User, Comment] });
  res.json(blogData);
});


router.post("/", async (req, res) => {
  if (!req.session.UserId) {
    res.status(401).json({ msg: "Cannot post without being signed in" });
  } else {
    const newBlog = await Blog.create({
      title: req.body.title,
      post_text: req.body.blog_text,
    });
    const user = await User.findByPk(req.session.UserId);

    await user.addBlog(newBlog.id);
    console.log(newBlog);
    console.log(user);
    res.json({ msg: "check server console" });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.UserId) {
    res.status(401).json({ msg: "must be logged in to remove a blog" });
  } else {
    const findBlog = await Blog.findByPk(req.params.id);
    if (!findBlog) {
      return res.status(404).json({ msg: "No post by that id" });
    } else if (findBlog.UserId !== req.session.UserId) {
      return res.status(403).json({ msg: "Not your blog" });
    }

    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteBlog) {
      res
        .status(500)
        .json({ msg: "an error occurred while deleting the blog" });
    } else {
      res.json(deleteBlog);
    }
  }
});

module.exports = router;