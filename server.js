if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const checkinRouter = require("./routes/checkin.js");
const passport = require("passport");

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
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Index page
app.get("/", (req, res) => {
  // Check if user already login
  if (req.user) {
    // Already login
    if (req.user.role === "seller") {
      res.render("seller/index.ejs", { user: req.user });
    } else if (req.user.role === "buyer") {
      res.render("buyer/index.ejs", { user: req.user });
    } else if (req.user.role === "shipper") {
      res.render("shipper/index.ejs", { user: req.user });
    }
  } else {
    // Have not login
    console.log("User has not login");
    res.redirect("/checkin/login");
  }
  // res.render("index.ejs", { name: req.user.username });
});

// Set up router
app.use("/checkin", checkinRouter);

// Run on port 3000
app.listen(3000);
