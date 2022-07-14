const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

//bring in Mongoose
const mongoose = require("mongoose");

//bring in MethodOverride
const methodOverride = require("method-override");

const blogRouter = require("./routes/blogs");
const Blog = require("./models/Blog");
const port = process.env.PORT || 5000;
const app = express();

//connect to Mongoose
mongoose.connect(
  "mongodb+srv://gilesgr1:MongoDB10@cluster0.lahdbch.mongodb.net/Blogs",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//set template engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//route for the index
app.get("/", async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });
  //   { // const blogs = [
  //     title: "The information we do not need",
  //     snippet:
  //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
  //     author: "Gail Giles",
  //     createdAt: new Date(),
  //     img: "placeholder.jpg",
  //   },
  //   {
  //     title: "The information we do not need",
  //     snippet:
  //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
  //     author: "Gail Giles",
  //     createdAt: new Date(),
  //     img: "placeholder.jpg",
  //   },
  //   {
  //     title: "The information we do not need",
  //     snippet:
  //       "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
  //     author: "Gail Giles",
  //     createdAt: new Date(),
  //     img: "placeholder.jpg",
  //   },
  // ];
  response.render("index", { blogs: blogs });
});

app.use(express.static("public"));
app.use("/blogs", blogRouter);

//listen port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
