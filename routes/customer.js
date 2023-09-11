const express = require("express");
const Product = require("./../models/product");
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
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "price";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    res.render("customer/search-result.ejs", { response: response });
    //define product
    const products = await Product.Product.find({
      name: { $regex: search, $options: "i" },
    })
      .sort(sortBy)
      .skip(page * limit);
    // $regex pattern matching string s in query
    // option is 'i' because it matches every letter doesn't matter it's capital or small

    const total = await Product.Product.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      products,
    };
    res.status(200).json(reponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
