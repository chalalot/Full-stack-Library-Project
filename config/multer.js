const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  // Where the file saved
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Rename the file
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      cb(null, true);
    } else {
      console.log("only jpg or png supported");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
