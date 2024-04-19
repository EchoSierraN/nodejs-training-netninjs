const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
//connect to mongodb
const dbURI =
  "mongodb+srv://echosierran:0ZCzGlq1Na1136Wt@cluster0.nmgsweq.mongodb.net/dbBlogs?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to the database.");
    console.log("Server listening at port 3000");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New blog 2",
//     snippet: "More about the new blog",
//     body: "Even more about the new blog",
//   });

//   blog.save().then((result) => {
//     res.send(result);
//   });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("66226383b686871f20d4fbe5")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//routes
app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  // const blogs = [
  //   { title: "Yoshi finds eggs", snippet: "Lorum ipsum something something" },
  //   { title: "Mario finds stars", snippet: "Lorum ipsum something something" },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorum ipsum something something",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

//404
app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404");
});
