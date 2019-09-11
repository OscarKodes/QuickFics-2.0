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

  res.send("create route success");
  // Fic.create(req.body.fic, function(err, newFic){
  //   if (err) {
  //     console.log(err);
  //     res.redirect("back");
  //   } else {
  //     res.redirect("/fics/" + newFic._id);
  //   }
  // })
});

// // SHOW ROUTE
// router.get("/:id", function(req, res){
//
//   Fic.findById(req.params.id, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("fics/show", {fic: foundFic});
//     }
//   });
// });
//
// // EDIT ROUTE
// router.get("/:id/edit", function(req, res){
//
//   Fic.findById(req.params.id, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.render("fics/edit", {fic: foundFic});
//     }
//   })
// });
//
// // UPDATE ROUTE
// router.put("/:id", function(req, res){
//
//   Fic.findByIdAndUpdate(req.params.id, req.body.fic, function(err, foundFic){
//     if (err) {
//       console.log(err);
//       res.redirect("back");
//     } else {
//       res.redirect("/fics/" + req.params.id);
//     }
//   })
// })
//
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
