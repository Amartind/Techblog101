const User = require("./user");
const Blog = require("./blog");
const Comment = require("./comment");

Blog.belongsTo(User, {
  onDelete: "Cascade",
});
User.hasMany(Blog);

Comment.belongsTo(Blog);

Blog.hasMany(Comment);

module.exports = {
  User,
  Blog,
  Comment,
};