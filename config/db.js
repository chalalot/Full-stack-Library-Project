// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
// ID: s3977747, s3927777, s3978165, s3978506, s3978290
// Acknowledgement: Pedro Tech, Web Dev Simplified.

const mongoose = require("mongoose");

// Set up mongoose. Change uri
const uri =
  "mongodb+srv://manh:1234@products.n5ly0up.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on("error", (e) => {
  console.log(e);
});

db.once("open", () => {
  console.log("Connected");
});

//new setup api
const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.connect( process.env.DB, connectionParams);

  mongoose.connection.on("connect", () => {
    console.log("Connected to database successfully");
  })

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database " + err);
  })

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection disconnected");
  })
}

module.exports = dbConnect;