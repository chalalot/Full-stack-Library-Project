// RMIT University Vietnam
//  Course: COSC2430 Web Programming
//  Semester: 2023A
//  Assessment: Assignment 2
//  Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
//  ID: s3977747, s3927777, s3978165, s3978506, s3978290
//  Acknowledgement: Pedro Tech, Web Dev Simplified.

const express = require("express");
const router = express.Router();
const User = require("./../models/user.js");
const Hub = require("./../models/hub.js");
const upload = require("./../config/multer.js");

router.post("/change-avatar", upload.single("image"), async (req, res) => {
  try {
    const user = await User.User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        profilePicture: req.file.path,
      },
      { returnOriginal: false },
    );

    if (user.__t === "Vendor") {
      res.redirect("/profiles/profile");
    } else if (user.__t === "Shipper") {
      res.redirect("/profiles/profile");
    } else if (user.__t === "Customer") {
      res.redirect("/profiles/profile");
    } else {
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
  }
});

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

router.get("/profile", checkAuthenticated, async (req, res) => {
  if (req.user.__t === "Vendor") {
    res.render("profiles/vendor-profile.ejs", { user: req.user });
  } else if (req.user.__t === "Shipper") {
    try {
      const hub = await Hub.findById(req.user.hub);
      res.render("profiles/shipper-profile.ejs", { user: req.user, hub: hub });
    } catch (e) {
      console.log(e);
      res.redirect("/");
    }
  } else if (req.user.__t === "Customer") {
    res.render("profiles/customer-profile.ejs", { user: req.user });
  }
});

module.exports = router;
