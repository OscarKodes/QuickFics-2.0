const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Fic = require("../models/fic");

const router = express.Router({mergeParams: true});

// EP Routes ===================================
// INDEX ROUTE
// NO NEED DESIGNATED INDEX ROUTE
// EPS INDEX IS COVERED WITHIN THE FIC SHOW PAGE


// NEW ROUTE
router.get("/new", function(req, res){
  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("eps/new", {
        fic_id: foundFic._id,
        chars: foundFic.chars,
      });
    }
  });
});

// CREATE ROUTE
router.post("/", function(req, res){

  let newEp = {
    title: req.body.title,
    char: req.body.char,
    text: req.body.text
  }

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      // console.log(foundFic.eps);
      // console.log(req.body.ep);
      foundFic.eps.push(newEp);
      foundFic.save();
      res.redirect("/fics/" + foundFic._id);
    }
  })
});

// // SHOW ROUTE
// // !!! NO NEED SHOW ROUTE
// /// Index route already shows all the details of the character
// /// characters only have a short description and nothing more
//
// // EDIT ROUTE
// router.get("/:char_idx/edit", function(req, res){
//
//   Fic.findById(req.params.id, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("chars/edit",
//       {
//         fic_id: foundFic._id,
//         char: foundFic.chars[req.params.char_idx],
//         char_idx: req.params.char_idx
//       })
//     }
//   });
// });
//
// // UPDATE ROUTE
// router.put("/:char_idx", function(req, res){
//
//   Fic.findById(req.params.id, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       foundFic.chars[req.params.char_idx] = req.body.char;
//       foundFic.save();
//       res.redirect("/fics/" + req.params.id + "/chars");
//     }
//   })
// });
//
// // DESTROY ROUTE
// router.delete("/:char_idx", function(req, res){
//
//   Fic.findById(req.params.id, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       foundFic.chars.splice(req.params.char_idx, 1);
//       foundFic.save();
//       res.redirect("/fics/" + req.params.id + "/chars");
//     }
//   });
// });


module.exports = router;
