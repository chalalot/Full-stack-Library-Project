const express = require("express");
const router = express.Router();
const Product = require("./../models/product.js");

router.get("/", (req, res) => {
  res.render("/vendor/index.js");
});

router.post("/create-product", (req, res) => {
  try {
  } catch (e) {
    res.redirect("/");
  }
});

module.exports = router;
