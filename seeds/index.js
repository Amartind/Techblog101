const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");

const userData = [
    {
      id:1,
      username: "user1",
      password: "password1",
    },
    {
      id:2,
      username: "user2",
      password: "password2",
    },
    {
      id:3,
      username: "user3",
      password: "password3",
    },
  ];
  
const seedUsers = () => User.bulkCreate(userData);

const blogData = [
    {
      id:1,
      title: "Blog 1",
      blog_text: "test text 1",
      UserId: 2,
    },
    {
      id:2,
      title: "Blog 2",
      blog_text: "test text 2",
      UserId: 1,
    },
    {
      id:3,
      title: "Blog 3",
      blog_text:
        "test text 3",
      UserId: 3,
    },
  ];
  
const seedBlogs = () => Blog.bulkCreate(blogData);

const commentData = [
    {
      comment_text: "comment 1",
      BlogId: 1,
    },
    {
      comment_text: "comment 2",
      BlogId: 1,
    },
    {
      comment_text: "comment 3",
      BlogId: 2,
    },
    {
      comment_text: "comment 4",
      BlogId: 3,
    },
  ];
  
  const seedComments = () => Comment.bulkCreate(commentData);

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("Seeding Users");
  await seedUsers();
  console.log("Seeding Blogs");
  await seedBlogs();
  console.log("Seeding Comments");
  await seedComments();

  process.exit(0);
};

seedAll();