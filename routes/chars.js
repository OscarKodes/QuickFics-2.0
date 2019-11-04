const express = require("express");
const Fic = require("../models/fic");
const middleware = require("../middleware");

const router = express.Router({mergeParams: true});

// Fic Routes ===================================
// INDEX ROUTE
router.get("/", function (req, res){

  Fic.
  findById(req.params.id).
  populate("author").
  exec(function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("chars/index", {
        fic: foundFic
      });
    }
  });
});

// NEW ROUTE
router.get("/new", middleware.checkFicOwnership, function(req, res){
  res.render("chars/new", {
    fic_id: req.params.id,
    unique_header: "backToFic"
  });
});

// CREATE ROUTE
router.post("/", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundFic.chars.push(req.body.char);
      foundFic.save();
      req.flash("success", "Character successfully added!");
      res.redirect("/fics/" + foundFic._id + "/chars");
    }
  })
});

// SHOW ROUTE
// !!! NO NEED SHOW ROUTE
/// Index route already shows all the details of the character
/// characters only have a short description and nothing more

// EDIT ROUTE
router.get("/:char_idx/edit", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("chars/edit",
      {
        fic_id: foundFic._id,
        char: foundFic.chars[req.params.char_idx],
        char_idx: req.params.char_idx,
        unique_header: "backToFic"
      })
    }
  });
});

// UPDATE ROUTE
router.put("/:char_idx", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundFic.chars[req.params.char_idx] = req.body.char;
      foundFic.save();
      req.flash("success", "Character successfully updated!");
      res.redirect("/fics/" + req.params.id + "/chars");
    }
  })
});

// DESTROY ROUTE
router.delete("/:char_idx", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundFic.chars.splice(req.params.char_idx, 1);
      foundFic.save();
      req.flash("success", "Character deleted.");
      res.redirect("/fics/" + req.params.id + "/chars");
    }
  });
});


module.exports = router;
