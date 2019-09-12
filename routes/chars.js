const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Fic = require("../models/fic");

const router = express.Router({mergeParams: true});

// Fic Routes ===================================
// INDEX ROUTE
router.get("/", function (req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log(foundFic);

      res.render("chars/index", {fic: foundFic});
    }
  });
});

// NEW ROUTE
router.get("/new", function(req, res){
  res.render("chars/new", {fic_id: req.params.id});
});

// CREATE ROUTE
router.post("/", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundFic.chars.push(req.body.char);
      foundFic.save();
      res.redirect("/fics/" + foundFic._id + "/chars");
    }
  })
});

// SHOW ROUTE
// !!! NO NEED SHOW ROUTE
/// Index route already shows all the details of the character
/// characters only have a short description and nothing more

// EDIT ROUTE
router.get("/:char_idx/edit", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("chars/edit",
      {
        fic_id: foundFic._id,
        char: foundFic.chars[req.params.char_idx],
        char_idx: req.params.char_idx
      })
    }
  });
});

// UPDATE ROUTE
router.put("/:char_idx", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      foundFic.chars[req.params.char_idx] = req.body.char;
      foundFic.save();
      res.redirect("/fics/" + req.params.id + "/chars");
    }
  })
});

// // DESTROY ROUTE
// router.delete("/:id", function(req, res){
//
//   Fic.findByIdAndDelete(req.params.id, function(err, deletedFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.redirect("/fics");
//     }
//   })
// });


module.exports = router;
