const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // Encrypt password
const User = require("./../models/user.js");
const passport = require("passport");

// Set up passport.js
const initializePassport = require("./../config/passport-config.js");
initializePassport(passport);

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("checkin/login.ejs");
});

router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("checkin/register.ejs");
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/checkin/login",
    failureFlash: true,
  }),
);

// Check if not authenticated
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // Redirect to home page if authenticated
    return res.redirect("/");
  }
  next();
}

// Create new instance in db and hash password
router.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    });

    try {
      await user.save();
      // Redirect to login page
      res.redirect("/checkin/login");
    } catch {
      res.redirect("/checkin/register");
    }
  } catch {
    res.redirect("/checkin/register");
  }
});

// Logout
router.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/checkin/login");
  });
});
// Export router
module.exports = router;
