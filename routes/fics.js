const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Fic = require("../models/fic");
const User = require("../models/user");
const middleware = require("../middleware");

const router = express.Router({mergeParams: true});

// Fic Routes ===================================
// INDEX ROUTE
router.get("/", function (req, res){
  Fic.
    find({}).
    populate("author").
    exec(function(err, foundFics){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("fics/index", {fics: foundFics});
    }
  });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("fics/new");
});

// CREATE ROUTE
router.post("/", function(req, res){

  // We set the User reference into the new fic here
  let newFic = new Fic (req.body.fic);
  newFic.author = req.user._id;

  Fic.create(newFic, function(err, createdFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      User.findById(req.user._id, function(err, foundUser){
        if (err) {
          console.log(err);
          req.flash("error", err.message);
          res.redirect("back");
        } else {
          // We set the Fic reference into the User here
          foundUser.fics.push(createdFic);
          foundUser.save();
          req.flash("success", "Successfully created new fic!");
          res.redirect("/fics/" + createdFic._id);
        }
      })
    }
  })
});

// SHOW ROUTE
router.get("/:id", function(req, res){

  Fic.
    findById(req.params.id).
    populate("author").
    exec(function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("fics/show", {fic: foundFic});
    }
  });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("fics/edit", {
        fic: foundFic,
        unique_header: "backToFic"
      });
    }
  })
});

// UPDATE ROUTE
router.put("/:id", middleware.checkFicOwnership, function(req, res){

  Fic.findByIdAndUpdate(req.params.id, req.body.fic, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      req.flash("success", "Successfully updated fic!");
      res.redirect("/fics/" + req.params.id);
    }
  })
})

// DESTROY ROUTE
router.delete("/:id", middleware.checkFicOwnership, function(req, res){

  Fic.findByIdAndDelete(req.params.id, function(err, deletedFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      req.flash("success", "Fic deleted.");
      res.redirect("/fics");
    }
  })
});


module.exports = router;
