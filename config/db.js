const mongoose = require("mongoose");

// Set up mongoose. Change uri
const uri =
  "mongodb+srv://ManhDuc:mymanhduc@cluster0.tqjcdy5.mongodb.net/checkin?retryWrites=true&w=majority";

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
