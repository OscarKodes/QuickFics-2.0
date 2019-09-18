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

// SHOW ROUTE
router.get("/:ep_num", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err){
      console.log(err);
      res.redirect("back");
    } else {
      res.render("eps/show.ejs", {
        fic_id: foundFic._id,
        ep: foundFic.eps[req.params.ep_num - 1],
        ep_num: Number(req.params.ep_num),
        last_ep_num: foundFic.eps.length
      });
    }
  })
})

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
