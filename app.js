const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
//connect to mongodb
const dbURI =
  "mongodb+srv://echosierran:0ZCzGlq1Na1136Wt@cluster0.nmgsweq.mongodb.net/";
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

app.use((req, res, next) => {
  console.log("========== NEW REQUEST ==============");
  console.log("Request hostname: " + req.hostname);
  console.log("Request path: " + req.path);
  console.log("Request method: " + req.method);
  next();
});

app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorum ipsum something something" },
    { title: "Mario finds stars", snippet: "Lorum ipsum something something" },
    {
      title: "How to defeat bowser",
      snippet: "Lorum ipsum something something",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

//404
app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404");
});
