const express = require("express");
const Blog = require("./../models/Blog");
const router = express.Router();

router.get("/new", (request, response) => {
  response.render("new");
});
router.get("/:slug", async (request, response) => {
  let blog = await Blog.findOne({ slug: request.params.slug });

  if (blog) {
    response.render("show", { blog: blog });
  } else {
    response.redirect("/");
  }
});

//route that handles new post
router.post("/", async (request, response) => {
  // console.log(request.body);

  let blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    description: request.body.description,
  });

  try {
    blog = await blog.save();
    response.redirect(`blogs/${blog.slug}`);
  } catch (error) {
    console.log(error);
  }
});

//route that handle edit view
router.get("/edit/:id", async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  response.render("edit", { blog: blog });
});

//route to handle updates
router.put("/:id", async (request, response) => {
  request.blog = await Blog.findById(request.params.id);
  let blog = request.blog;
  blog.title = request.body.title;
  blog.author = request.body.author;
  blog.description = request.body.description;

  try {
    blog = await blog.save();
    //redirect to the view route
    response.redirect(`/blogs/${blog.slug}`);
  } catch (error) {
    response.redirect(`/blogs/edit/${blog.id}`, { blog: blog });
  }
});

module.exports = router;
