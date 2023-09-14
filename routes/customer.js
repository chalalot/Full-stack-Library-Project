const express = require("express");
const Product = require("./../models/product");
const Hub = require("./../models/hub");
const User = require("./../models/user");
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
      name: { $regex: new RegExp(req.query.searchQuery, "i") },
    });

    res.render("customer/search-result.ejs", {
      products: products,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// filter the price
router.post("/filter-amount", checkAuthenticated, async (req, res) => {
  try {
    const products = await Product.Product.find({
      price: {
        $gt: req.body.minimum,
        $lt: req.body.maximum,
      },
    });
    res.render("customer/search-result", {
      products: products,
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.get("/shopping-cart", checkAuthenticated, async (req, res) => {
  try {
    if (!req.session.order) {
      req.session.order = []; // If session order is empty then initialize a new one
    }
    // Get total cost of products
    let total = req.session.order.reduce(
      (total, product) => total + product.price,
      0,
    );
    // Render shopping cart with the orders from session
    res.render("customer/shopping-cart.ejs", {
      products: req.session.order,
      total: total,
      user: req.user,
    });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

// Confirm order
router.post("/shopping-cart", checkAuthenticated, async (req, res) => {
  try {
    // Get a random hub
    const random = Math.floor(Math.random() * (await Hub.countDocuments()));
    const hub = await Hub.findOne().skip(random);

    // Get total cost of products
    let total = req.session.order.reduce(
      (total, product) => total + product.price,
      0,
    );

    const order = Product.Order({
      customer: req.user._id,
      products: req.session.order.map((product) => ({ product: product._id })),
      address: req.user.address,
      orderDate: new Date(),
      totalCost: total,
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
    const vendor = await User.Vendor.findById(product.vendor);
    res.render("customer/product.ejs", {
      product: product,
      vendor: vendor,
      user: req.user,
    });
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

router.delete("/:id", checkAuthenticated, async (req, res) => {
  try {
    // Delete from current session

    req.session.order = req.session.order.filter(
      (product) => product._id !== req.params.id,
    );
  } catch (e) {
    console.log(e);
  }
  res.redirect("/customer/shopping-cart");
});

module.exports = router;
