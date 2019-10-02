const csv = require("csv-parser");
const fs = require("fs");
const express = require("express");
const app = express();
const results = [];

app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";

app.get("/", (request, response) => {
  response.send("This is the main page");
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}`
  );
});

app.use(express.json());

module.exports = playerData = () => {
  fs.createReadStream("1950.csv")
    .pipe(csv())
    .on("data", data => results.push(data))
    .on("end", results => results);
};

console.log(playerData())