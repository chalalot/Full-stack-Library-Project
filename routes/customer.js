const express = require("express");
const Product = require("./../models/product");
const Hub = require("./../models/hub");
const router = express.Router();

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

router.get("/search-result", checkAuthenticated, async (req, res) => {
  try {
    const products = await Product.Product.find({
      name: req.query.searchQuery,
    });
    console.log(req.query.searchQuery);

    res.render("customer/search-result.ejs", { products: products });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/shopping-cart", checkAuthenticated, async (req, res) => {
  try {
    // Render shopping cart with the orders from session
    res.render("customer/shopping-cart.ejs", { orders: req.session.order });
  } catch (e) {
    console.log(e);
  }
});

// Confirm order
router.post("/shopping-cart", checkAuthenticated, async (req, res) => {
  try {
    // Get a random hub
    const random = Math.floor(Math.random() * Hub.countDocuments());
    const hub = await Hub.findOne().skip(random);

    const order = Product.Order({
      customer: req.user._id,
      products: req.session.order,
      address: req.user.address,
      orderData: new Date(),
      status: "active",
    });

    // Push order to random hub
    await order.save();
    hub.orders.push({ order: order._id });
    await hub.save();
    // Clear session
    req.session.order = [];
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

// Get product information
router.get("/:id", checkAuthenticated, async (req, res) => {
  // Render product
  try {
    const product = await Product.Product.findById(req.params.id);
    if (!product) {
      res.redirect("/");
    }

    res.render("vendor/product.ejs", { product: product });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

// Buying the product
router.post("/:id", checkAuthenticated, async (req, res) => {
  // Add the product to session
  const product = await Product.Product.findById(req.params.id);

  if (!req.session.order) {
    req.session.order = []; // If session order is empty then initialize a new one
  }
  req.session.order.push(product);
  res.redirect("/"); // Might change this to go to shopping cart
});

module.exports = router;
