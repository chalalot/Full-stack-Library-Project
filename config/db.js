const mongoose = require("mongoose");

// Set up mongoose
const uri =
  "mongodb+srv://dongmanhduc66:D762^&uid093@products.n5ly0up.mongodb.net/?retryWrites=true&w=majority";
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