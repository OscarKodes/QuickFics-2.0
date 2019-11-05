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
  res.redirect("/fics");
});

router.get("/about", function(req, res){
  res.render("about");
});

// Register Render form
router.get("/register", function(req, res){
  res.render("register");
});

// Register process user
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
          req.flash("success", "Welcome! Now you can create and save fics!");
          res.redirect("/fics");
        });
      }
    }
  )
});

// Login render form
router.get("/login", function(req, res){
  res.render("login");
})

// Login process user
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/fics",
    successFlash: "Welcome!",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res){
});

// Logout Process
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You have been successfully logged out!");
  res.redirect("/fics");
});

// Create NavBar button to page for easy creation access
router.get("/create", middleware.isLoggedIn, function(req, res){
  User.
    findById(req.user._id).
    populate("fics").
    exec(function(err, foundUser){
      if (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        res.render("create", {user: foundUser});
      }
  })
});

// User's Profile My Fics
router.get("/user/:user_id", function(req, res){
  User.
    findById(req.params.user_id).
    populate("fics").
    exec(function(err, foundUser){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("profile", {user: foundUser});
    }
  });
});

// SEARCH RESULTS PAGE
router.get("/search/", function(req, res){

  Fic.
  find({
    $or: [
      {"title": new RegExp(req.query.keyword, 'i')},
      {"description": new RegExp(req.query.keyword, 'i')},
      {"eps.title": new RegExp(req.query.keyword, 'i')},
      {"chars.name": new RegExp(req.query.keyword, 'i')},
    ]
  }).
  populate("author").
  exec(function(err, foundFics){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("searchPage", {fics: foundFics, keyword: req.query.keyword});
    }
  });
});


module.exports = router;
