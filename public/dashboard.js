const blogBtn = document.querySelector("#newBlog");
const blogDiv = document.querySelector("#blogDiv");

// creates a new blog on click, server handles creation and assigning the blog to the user
blogBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const newBlogObj = {
    title: document.querySelector("#blogTitle").value,
    blog_text: document.querySelector("#blogText").value,
  };

  const createNewBlog = await fetch("/api/blog", {
    method: "POST",
    body: JSON.stringify(newBlogObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (createNewBlog.ok) {
    document.querySelector("#blogTitle").value = "";
    document.querySelector("#blogText").value = "";
    location.reload();
  } else {
    console.log("woopsie!");
  }
});

// Add a comment to your own blog
blogDiv.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.matches("#commentSubmit")) {
    let commentBtn = e.target;
    let commentText = e.target.parentNode.children[1].value;
    let blogID = commentBtn.parentNode.parentNode.getAttribute("id");
    let newCommentObj = {
      comment_text: commentText,
      BlogId: blogID,
    };

    const blogComment = await fetch(`/api/comments/${blogID}`, {
      method: "POST",
      body: JSON.stringify(newCommentObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (blogComment.ok) {
      e.target.parentNode.children[1].value = "";
      location.reload();
    } else {
      console.log("something happened");
    }
  }
});

// Delete a blog
blogDiv.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.matches("#deleteBtn")) {
    let deleteBtn = e.target;
    let blogID = deleteBtn.parentNode.parentNode.children[3].getAttribute("id");
    const deleteBlog = await fetch(`/api/blog/${blogID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (deleteBlog.ok) {
      location.reload();
    } else {
      console.log("something went wrong!");
    }
  }
});