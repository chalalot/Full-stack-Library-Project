const express = require("express");
const router = express.Router();
const User = require("./../models/user.js");
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
    console.log("success");
    console.log(user.profilePicture);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});



module.exports = router;
