// RMIT University Vietnam
//  Course: COSC2430 Web Programming
//  Semester: 2023A
//  Assessment: Assignment 2
//  Author: Dong Manh Duc, Do Thuy Linh, Le Nguyen My Chau, Nguyen Ba Duc Manh, Tran Tuan Trung
//  ID: s3977747, s3927777, s3978165, s3978506, s3978290
//  Acknowledgement: Pedro Tech, Web Dev Simplified.

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const checkinRouter = require("./routes/checkin.js");
const profileRouter = require("./routes/profile.js");
const vendorRouter = require("./routes/vendor.js");
const passport = require("passport");
const methodOverride = require("method-override");
const cors = require("cors"); // for searching
const dbConnect = require("./config/db.js");
const customerRouter = require("./routes/customer.js");
const shipperRouter = require("./routes/shipper.js");
const Product = require("./models/product.js");
const Hub = require("./models/hub.js");

// Set up mongoose
require("./config/db.js");
dbConnect();
// Set up express
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(cors());
app.use(express.json());

// connect to public
app.use(express.static("public"));
// Connect to images
app.use("/uploads", express.static("uploads"));

// Prevent users from going back
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Check if user authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated then move to the next task
  }
  // Redirect to login page
  res.redirect("/checkin/login");
}

app.get("/", checkAuthenticated, async (req, res) => {
  // Already login
  try {
    if (req.user.__t === "Vendor") {
      const products = await Product.Product.find({ vendor: req.user._id });
      res.render("vendor/index.ejs", { user: req.user, products: products });
    } else if (req.user.__t === "Customer") {
      const products = await Product.Product.find();
      res.render("customer/index.ejs", { user: req.user, products: products });
    } else if (req.user.__t === "Shipper") {
      const hubWithOrders = await Hub.findById(req.user.hub).populate({
        path: "orders.order",
        populate: {
          path: "customer",
          model: "Customer",
        },
      });
      const orders = hubWithOrders.orders
        .filter(
          (orderObject) =>
            orderObject.order !== null && orderObject.order.status === "active",
        ) // Filter out null orders and get only active orders
        .map((orderObject) => orderObject.order);

      res.render("shipper/index.ejs", {
        user: req.user,
        orders: orders,
        hub: hubWithOrders,
      });
    }
  } catch (e) {
    console.log(e);
    res.redirect("/checkin/login");
  }
});

// Set up router
app.use("/checkin", checkinRouter);
app.use("/profiles", profileRouter);
app.use("/vendor", vendorRouter);
app.use("/customer", customerRouter);
app.use("/shipper", shipperRouter);


//create hubs
// let hubs = [
//   {
//     name:'Viettel Post',
//     address: 'Ninh Hiep',
//   },
//   {
//     name: 'J&T Express',
//     address:'Cau Giay',
//   },
// ];

// Hub.insertMany(hubs).then( () => console.log("save success")).catch(err => console.log(err))

//Run on port 3000
app.listen(3000);
