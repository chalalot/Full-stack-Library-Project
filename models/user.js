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
