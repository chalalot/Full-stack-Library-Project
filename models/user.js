// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
// ID: s3977747, s3927777, s3978165, s3978506, s3978290
// Acknowledgement: Pedro Tech, Web Dev Simplified.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Similar attributes shared accross all user types
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:"images/default-ava.png",
  },
});

const vendorSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
  },
  businessAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

const customerSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});

const shipperSchema = new Schema({
  hub: {
    type: Schema.Types.ObjectId,
    ref: "Hub",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Vendor = User.discriminator("Vendor", vendorSchema);
const Customer = User.discriminator("Customer", customerSchema);
const Shipper = User.discriminator("Shipper", shipperSchema);

// Export Schema
module.exports = {
  User,
  Vendor,
  Customer,
  Shipper,
};
