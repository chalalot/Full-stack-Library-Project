// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
// ID: s3977747, s3927777, s3978165, s3978506, s3978290
// Acknowledgement: Pedro Tech, Web Dev Simplified.

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
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
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
