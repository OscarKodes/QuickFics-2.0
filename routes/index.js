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
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome!");
          res.redirect("/fics");
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
    successRedirect: "/fics",
    successFlash: "Welcome!",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res){
});

//Logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You have been successfully logged out!");
  res.redirect("/fics");
})

router.get("/user/:user_id", function(req, res){
  res.send("User profile page success");
});


module.exports = router;
