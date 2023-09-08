const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Have to check if its usable username
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
  role: {
    type: String,
    required: true,
  },
});

// Export Schema
module.exports = mongoose.model("User", userSchema);
