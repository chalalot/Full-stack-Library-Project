// RMIT University Vietnam
//  Course: COSC2430 Web Programming
//  Semester: 2023A
//  Assessment: Assignment 2
//  Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
//  ID: s3977747, s3927777, s3978165, s3978506, s3978290
//  Acknowledgement: Pedro Tech, Web Dev Simplified.

const express = require("express");
const router = express.Router();
const upload = require("./../config/multer.js");
const Product = require("./../models/product.js");

// Search product
router.get("/search-result", checkAuthenticated, async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery; // Access the searchQuery parameter from the URL

    const products = await Product.Product.find({
      $and: [
        { name: { $regex: new RegExp(searchQuery, "i") } }, // 'i' for case-insensitive search
        { vendor: req.user._id },
      ],
    });
    res.render("vendor/search-result.ejs", {
      products: products,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

router.get("/add-products", checkAuthenticated, (req, res) => {
  // Render the form
  res.render("vendor/add-products.ejs", { error: "", user: req.user });
});

router.get("/:id", checkAuthenticated, async (req, res) => {
  // Get the product
  try {
    const product = await Product.Product.findById(req.params.id);

    if (!product) {
      // Handle the case where the product is not found
      return res.redirect("/");
    }
    res.render("vendor/product.ejs", { product: product, user: req.user });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
}); // Render product page from product id

router.post(
  "/add-products",
  checkAuthenticated,
  upload.single("image"),
  async (req, res) => {
    try {
      let product = new Product.Product({
        name: req.body.name,
        vendor: req.user._id,
        price: parseFloat(req.body.price),
        image: req.file.path,
        description: req.body.description,
      });

      await product.save();
      res.redirect(`/vendor/${product._id}`); // Redirect to the product page
    } catch (e) {
      // Redirect and show error
      req.flash("error", e.message);
      // const regex = /name: (.*)/;
      // const match = regex.exec(e.message);
      // const errorMessage = match[1];
      res.render("vendor/add-products.ejs", {
        error: e.message,
        user: req.user,
      });
    }
  },
);

module.exports = router;
