const Blog = require("../models/blog");

const blog_index = (req, res) => {
  const blog = new Blog(req.body);
  console.log(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
};
