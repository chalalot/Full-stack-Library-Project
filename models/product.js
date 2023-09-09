const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {},
});

module.exports = mongoose.model("Product", productSchema);
