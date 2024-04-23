const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});
