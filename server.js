if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const checkinRouter = require("./routes/checkin.js");
const profileRouter = require("./routes/profile.js");
const vendorRouter = require("./routes/vendor.js");
const passport = require("passport");
const methodOverride = require("method-override");

// Set up mongoose
require("./config/db");

// Set up express
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
// connect to public
app.use(express.static("public"));
// Connect to images
app.use("/uploads", express.static("uploads"));

// Prevent users from going back
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

// Index page: Change later
app.get("/", checkAuthenticated, (req, res) => {
  // Already login
  if (req.user.__t === "Vendor") {
    res.render("vendor/index.ejs", { user: req.user });
  } else if (req.user.__t === "Customer") {
    res.render("customer/index.ejs", { user: req.user });
  } else if (req.user.__t === "Shipper") {
    res.render("shipper/index.ejs", { user: req.user });
  }
});

// Set up router
app.use("/checkin", checkinRouter);
app.use("/profiles", profileRouter);
app.use("/vendor", vendorRouter);

// Run on port 3000
app.listen(3000);
