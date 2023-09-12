const express = require("express");
const router = express.Router();
const Product = express.Router();

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
    res.render("shipper/order.ejs", { order: order });
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});

router.post("/", (req, res) => {});

module.exports = router;
