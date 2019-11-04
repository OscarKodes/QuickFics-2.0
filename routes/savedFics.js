const express = require("express");
const User = require("../models/user.js");
const middleware = require("../middleware");
const router = express.Router({mergeParams: true});

// SavedFics INDEX ROUTE ==============
router.get("/", middleware.isLoggedIn, function(req, res){
  User.
  findById(req.user._id).
  populate("savedFics").
  exec(function(err, foundUser){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("savedFics", {savedFics: foundUser.savedFics});
    }
  })
});

// SavedFics NEW ROUTE ==============
// No need to render a form for new savedFic, 'Save Fic' button is enough

// SavedFics CREATE ROUTE ==============
router.post("/", middleware.isLoggedIn, function(req, res){

  User.findById(req.user._id, function(err, foundUser){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundUser.savedFics.push(req.body.fic_id);
      foundUser.save();
      req.flash("success", "Fic successfully saved!");
      res.redirect("back");
    }
  });
});

// SavedFics SHOW ROUTE ==============
// No need. Index Route is enough.

// SavedFics EDIT ROUTE ==============
// No need. A delete route is all we need.

// SavedFics UPDATE ROUTE ==============
// No need. A delete route is all we need.

// SavedFics DESTROY ROUTE ==============
router.delete("/:fic_id", middleware.isLoggedIn, function(req, res){

  User.findById(req.user._id, function(err, foundUser){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      const savedIdx = foundUser.savedFics.indexOf(req.params.fic_id);
      foundUser.savedFics.splice(savedIdx, 1);
      foundUser.save();
      req.flash("success", "Saved Fic successfully removed.");
      res.redirect("back");
    }
  })
});


module.exports = router;
