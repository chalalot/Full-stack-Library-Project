const express = require("express");
const router = express.Router();
const upload = require("./../config/multer.js");
const Product = require("./../models/product.js");
const { error } = require("console");

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
  res.render("vendor/add-products.ejs", { error: "" });
});

router.get("/:id", checkAuthenticated, async (req, res) => {
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
      res.redirect(`/vendor/${product._id}`); // Redirect to the product page
    } catch (e) {
      // Redirect and show error
      req.flash("error", e.message);
      // const regex = /name: (.*)/;
      // const match = regex.exec(e.message);
      // const errorMessage = match[1];
      res.render("vendor/add-products.ejs", { error: e.message });
    }
  },
);

// search product
router.get("/search", checkAuthenticated, async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery; // Access the searchQuery parameter from the URL

    const product = Product.Product.find({ name:searchQuery});

    // Now you can use the value of searchQuery in your code
    console.log("Search Query:", searchQuery);

    // Rest of your code for processing the search query

    res.render("vendor/index.ejs", { products : product });

  } catch (err) {
    console.error("Error:", err);
    res.redirect("/");
  }
});


module.exports = router;
