const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hubSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [
    {
      order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Hub", hubSchema);
