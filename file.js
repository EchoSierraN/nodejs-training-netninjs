const fs = require("fs");

//create

//read
fs.readFile("./docs/blog1.txt", (error, data) => {
  if (error) {
    console.log(error);
  }

  console.log(data.toString());
});
//update

//delete
