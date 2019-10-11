const express = require("express");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Fic = require("../models/fic");
const User = require("../models/user");
const middleware = require("../middleware");

const router = express.Router();

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes =======================================
router.get("/", function(req, res){
  res.redirect("/front");
});

router.get("/front", function(req, res){
  res.render("front");
});

router.get("/secrets", middleware.isLoggedIn, function(req, res){
  res.render("secrets");
});

//Register Render form
router.get("/register", function(req, res){
  res.render("register");
});

//Register process user
router.post("/register", function(req, res){
  User.register(
    {username: req.body.username},
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("back");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/secrets");
        });
      }
    }
  )
});

//Login render form
router.get("/login", function(req, res){
  res.render("login");
})

//Login process user
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  }), function(req, res){
});

//Logout
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/fics");
})


module.exports = router;
