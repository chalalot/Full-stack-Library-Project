const express = require("express");
const router = express.Router();
const upload = require("./../config/multer.js");
const Product = require("./../models/product.js");

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

router.get("/view-products", checkAuthenticated, async (req, res) => {
  // Get a list of products of this vendor
  try {
    const products = await Product.Product.find({ vendor: req.user._id });
    res.render("vendor/view-products", { products: products });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.get("/add-products", checkAuthenticated, (req, res) => {
  // Render the form
  res.render("vendor/add-products.ejs", { error: "" });
});

router.get("/view-products/:id", checkAuthenticated, async (req, res) => {
  // Get the product
  try {
    const product = await Product.Product.findById(req.params.id);

    if (!product) {
      // Handle the case where the product is not found
      return res.redirect("/");
    }

    res.render("vendor/product.ejs", { product: product });
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
      res.redirect(`/vendor/view-products/${product._id}`); // Redirect to the product page
    } catch (e) {
      // Redirect and show error
      req.flash("error", e.message);
      const regex = /name: (.*)/;
      const match = regex.exec(e.message);
      const errorMessage = match[1];
      res.render("vendor/add-products.ejs", { error: errorMessage });
    }
  },
);

module.exports = router;
