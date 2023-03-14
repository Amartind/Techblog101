const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const createUser = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  req.session.UserId = createUser.id;
  req.session.username = createUser.username;
  req.session.loggedIn = true;
  res.json(createUser);
});


router.get("/:id", async (req, res) => {
  const findOneUser = await User.findByPk(req.params.id);

  res.json(findOneUser);
});


router.post("/signin", async (req, res) => {
  const foundUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!foundUser) {
    return res.status(401).json({ msg: "incorrect username or password" });
  } else {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.username = foundUser.username;
      req.session.UserId = foundUser.id;
      req.session.loggedIn = true;
      return res.json(foundUser);
    } else {
      return res.status(401).json({ msg: "incorrect username or password" });
    }
  }
});


router.delete("/logout", async (req, res) => {
  req.session.destroy();
  res.json({ msg: "Logged out" });
});

module.exports = router;