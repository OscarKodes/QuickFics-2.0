// Requirements =================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const Fic = require("./models/fic");
const User = require("./models/user");
const middleware = require("./middleware");

const app = express();


// Require route module files
const ficRoutes = require("./routes/fics");
const charRoutes = require("./routes/chars");
const epRoutes = require("./routes/eps");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

mongoose.connect("mongodb://localhost:27017/ficsDB",
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);


app.use(indexRoutes);
app.use("/fics", ficRoutes);
app.use("/fics/:id/chars", charRoutes);
app.use("/fics/:id/eps", epRoutes);
app.use("/auth", authRoutes);





app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
