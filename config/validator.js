// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
// ID: s3977747, s3927777, s3978165, s3978506, s3978290
// Acknowledgement: Pedro Tech, Web Dev Simplified.

const { body, optional } = require("express-validator");

const validateRegistration = [
  // Validate username
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and digits")
    .isLength({ min: 8, max: 15 })
    .withMessage("Username must be between 8 and 15 characters"),

  // Validate password
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    ),

  body("businessName")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Business name must be at least 5 characters long"),

  body("businessAddress")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Business address must be at least 5 characters long"),

  body("name")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),

  body("address")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long"),
];

module.exports = {
  validateRegistration,
};
