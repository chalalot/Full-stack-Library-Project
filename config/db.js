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