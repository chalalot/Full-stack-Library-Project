const express = require("express");
require("./config/db");

// Set up express
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { name: "Duc" });
});

// Run on port 3000
app.listen(3000);
