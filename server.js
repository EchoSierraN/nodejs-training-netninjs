const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Request made.");
  res.setHeader("Content-Type", "text/html");
  //display html
  if (req.url === "/") {
    res.statusCode = 200;
    outputHtml(res, "./views/index.html");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    outputHtml(res, "./views/about.html");
  } else if (req.url === "/about-us") {
    /* redirect /about-us to /about */
    res.statusCode = 301;
    res.setHeader("Location", "/about");
    res.end();
  } else {
    res.statusCode = 404;
    outputHtml(res, "./views/404.html");
  }
  //   fs.readFile("./views/index.html", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       res.end();
  //     } else {
  //       res.write(data);
  //       res.end();
  //     }
  //   });
});

server.listen(3000, "localhost", () => {
  console.log("Listening on port 3000...");
});

const outputHtml = (res, path) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
};
