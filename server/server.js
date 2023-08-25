/*
==========================================
INSTALLING THE PACKAGES
==========================================
*/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Book = require("./models/book");
const vision = require("@google-cloud/vision");
const { checkError } = require("./multerLogic");
const path = require("path");
require("dotenv").config();
const corsOptions = {
  origin: "https://chapter-swap.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "./remedi-349504-ddc8d6cafde9.json";

/*
==========================================
CONFIGURATIONS
==========================================
*/

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_CONN_STRING, (err) => {
  if (err) console.log(err);
  else console.log(`connected to ${process.env.MONGO_CONN_STRING}`);
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "demonsslayer",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.listen(PORT, function () {
  console.log(`Server Started at port ${PORT}`);
});
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

app.get("/", (req, res) => {
  res.send("Hii React");
});

const userDetails = {
  name: "",
  phone: "",
  email: "",
  password: "",
  totalPriceDonated: 0,
  level: 0,
  type: "",
  numDonations: 0,
  otp: "",
};

var otp = "";
var name = "";
var email = "";
var password = "";
var type = "";
var phone = "";

app.post("/register", function (req, res) {
  if (isUserOrNgoExist(req.body.phone, req.body.email) == true) {
    var errmsg = {
      message: "Email or Phone Number already registered.",
    };
    res.send({
      success: false,
      err: errmsg.message,
    });
  } else {
    const userDetails = {
      username: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      totalPriceDonated: 0,
      level: 0,
      type: req.body.type,
      numDonations: 0,
      otp: generateOTP(),
    };
    const msg = {
      to: req.body.email, //recipient
      from: "remediHackfest@gmail.com",
      subject: 'Otp for registration is: "',
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        userDetails.otp +
        "</h1>", // html body
    };
    transporter.sendMail(msg, function (err, data) {
      if (err) {
        console.log("Error " + err);
        res.send({
          success: false,
          err: err,
        });
      } else {
        console.log("Email sent successfully");
        otp = userDetails.otp;
        name = userDetails.name;
        email = userDetails.email;
        phone = userDetails.phone;
        type = userDetails.type;
        password = userDetails.password;
        res.send({
          success: true,
          userDetails: userDetails,
        });
      }
    });
  }
});

app.post("/verifyregister", function (req, res) {
  console.log(otp, name, email, password, type);
  if (req.body.otp == otp) {
    User.register(
      {
        username: email,
        email: email,
        name: name,
        phone: phone,
        totalPriceDonated: 0,
        level: 1,
        type: type,
        numDonations: 0,
      },
      password,
      function (err, userdata) {
        if (err) {
          console.log(err);
          res.send({
            success: false,
            err: err,
          });
        } else {
          res.send({
            success: true,
            userDetails: userdata,
          });
        }
      }
    );
  } else {
    res.send({
      success: false,
      err: "Otp is incorrect",
    });
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `/success`,
    failureRedirect: "/failure",
  })
);

app.get("/failure", (req, res) => {
  res.send({ success: false });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.send({ success: true });
});

app.get("/success", (req, res) => {
  res.send({
    success: true,
  });
});

app.post("/user", (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("books")
    .exec((err, foundUser) => {
      if (err) console.log(err);
      else res.send({ success: true, user: foundUser });
    });
});

app.get("/book/getAll", (req, res) => {
  Book.findAll({}, (err, books) => {
    res.send({
      success: true,
      foundBooks: foundBooks,
    });
  })
})

app.post("/book", (req, res) => {
  const details = {
    name: req.body.name,
    publisher: req.body.publisher,
    availableQuantity: req.body.availableQuantity,
    totalQuantity: req.body.totalQuantity,
    totalPrice: req.body.totalPrice,
    totalWorth: req.body.totalWorth,
    publicationDate: req.body.publicationDate,
    author: req.body.author,
    username: req.body.username,
    address: req.body.address,
    status: req.body.status,
    listDate: req.body.listDate,
  };
  Book.create(details, (err, book) => {
    User.findOne({ email: details.username }, (err, foundUser) => {
      if (err) console.log(err);
      else {
        foundUser.totalPriceDonated += details.totalWorth;
        foundUser.numDonations++;
        if (foundUser.numDonations <= 10) foundUser.level = 1;
        else if (foundUser.numDonations > 10 && foundUser.numDonations <= 25)
          foundUser.level = 2;
        else if (foundUser.numDonations > 25 && foundUser.numDonations <= 50)
          foundUser.level = 3;
        else if (foundUser.numDonations > 50 && foundUser.numDonations <= 100)
          foundUser.level = 4;
        else foundUser.level = 5;
        foundUser.save((err, data) => {
          if (err) console.log(err);
          res.send({ success: true, userDetails: data });
        });
      }
    });
  });
});

app.post("/getBook", (req, res) => {
  Book.find({ name: req.body.query }, (err, foundBooks) => {
    res.send({
      success: true,
      foundBooks: foundBooks,
    });
  });
});

app.post("/collect", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user.type == "ngo") {
      Book.findOne({ _id: req.body.id }, (err, book) => {
        book.status = "collected";
        book.save((err, book) => {
          User.findOne(
            { username: req.body.username },
            function (err, foundUser) {
              if (err) console.log(err);
              else {
                foundUser.books.push(book);
                foundUser.save(function (err, data) {
                  if (err) console.log(err);
                });
              }
            }
          );
        });
      });
      res.send({
        success: true,
      });
    }
  });
});

async function quickstart(req, res) {
  try {
    //Creates a client
    const client = new vision.ImageAnnotatorClient();
    const imageDesc = await checkError(req, res);
    console.log(imageDesc);
    //Performs text detection on the local file
    const [result] = await client.textDetection(imageDesc.path);
    const detections = result.textAnnotations;
    const [text, ...others] = detections;
    res.send(`Text: ${text.description}`);
  } catch (error) {
    console.log(error);
  }
}

app.get("/detectText", async (req, res) => {
  res.send("welcome to the homepage");
});

app.post("/detectText", quickstart);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function isUserOrNgoExist(phone, email) {
  User.find(
    { $or: [{ phone: phone }, { email: email }] },
    (err, foundUsers) => {
      if (foundUsers.length != 0) return true;
      return false;
    }
  );
}
