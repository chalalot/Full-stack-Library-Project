// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
// ID: s3977747, s3927777, s3978165, s3978506, s3978290
// Acknowledgement: Pedro Tech, Web Dev Simplified.

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
