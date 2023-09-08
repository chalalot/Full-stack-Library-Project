const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // Encrypt password
const User = require("./../models/user.js");
const passport = require("passport");

// Set up passport.js
const initializePassport = require("./../config/passport-config.js");
initializePassport(passport);

router.get("/login", (req, res) => {
  res.render("checkin/login.ejs");
});

router.get("/register", (req, res) => {
  res.render("checkin/register.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/checkin/login",
    failureFlash: true,
  }),
);

// Create new instance in db and hash password
router.post("/register", async (req, res) => {
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

// Export router
module.exports = router;
