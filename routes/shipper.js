const express = require("express");
const router = express.Router();
const Product = require("./../models/product.js");
const User = require("./../models/user.js");

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

router.get("/:id", checkAuthenticated, async (req, res) => {
  try {
    const order = await Product.Order.findById(req.params.id);

    if (!order) {
      res.redirect("/");
    }

    const customer = await User.Customer.findById(order.customer);
    res.render("shipper/order.ejs", { order: order, customer: customer });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.post("/", (req, res) => {});

module.exports = router;
