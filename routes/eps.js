const express = require("express");
const Fic = require("../models/fic");
const middleware = require("../middleware");

const router = express.Router({mergeParams: true});

// EP Routes ===================================
// INDEX ROUTE
// NO NEED DESIGNATED INDEX ROUTE
// EPS INDEX IS COVERED WITHIN THE FIC SHOW PAGE


// NEW ROUTE
router.get("/new", middleware.checkFicOwnership, function(req, res){
  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("eps/new", {
        fic_id: foundFic._id,
        chars: foundFic.chars,
        unique_header: "epForm"
      });
    }
  });
});

// CREATE ROUTE
router.post("/", middleware.checkFicOwnership, function(req, res){

  let newEp = {
    title: req.body.title,
    bgColor: req.body.bgColor,
    char: req.body.char,
    text: req.body.text,
    fontColor: req.body.fontColor,
    highlight: req.body.highlight
  }

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      // console.log(foundFic.eps);
      // console.log(req.body.ep);
      foundFic.eps.push(newEp);
      foundFic.save();
      req.flash("success", "New episode created!");
      res.redirect("/fics/" + foundFic._id);
    }
  })
});

// SHOW ROUTE
router.get("/:ep_num", function(req, res){

  Fic.
  findById(req.params.id).
  populate("author").
  exec(function(err, foundFic){
    if (err){
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("eps/show.ejs", {
        fic: foundFic,
        ep: foundFic.eps[req.params.ep_num - 1],
        ep_num: Number(req.params.ep_num),
        last_ep_num: foundFic.eps.length,
        unique_header: "ep_show"
      });
    }
  })
})

// EDIT ROUTE
router.get("/:ep_num/edit", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      res.render("eps/edit",
      {
        fic_id: foundFic._id,
        chars: foundFic.chars,
        ep: foundFic.eps[req.params.ep_num - 1],
        ep_num: Number(req.params.ep_num),
        unique_header: "epForm"
      })
    }
  });
});

// EPS UPDATE ROUTE
router.put("/:ep_num", middleware.checkFicOwnership, function(req, res){

  let editedEp = {
    title: req.body.title,
    bgColor: req.body.bgColor,
    char: req.body.char,
    text: req.body.text,
    fontColor: req.body.fontColor,
    highlight: req.body.highlight
  }

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundFic.eps[req.params.ep_num - 1] = editedEp;
      foundFic.save();
      req.flash("success", "Episode updated!");
      res.redirect("/fics/" + req.params.id + "/eps/" + req.params.ep_num);
    }
  })
});

// STARS / LIKES UPDATE ROUTE
router.put("/:ep_num/like", middleware.isLoggedIn, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    const epLikes = foundFic.eps[req.params.ep_num - 1].likes;
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else if (epLikes.includes(req.user._id)) {
      const likeIdx = epLikes.indexOf(req.user._id);
      epLikes.splice(likeIdx, 1);
      foundFic.totalLikes--;
      foundFic.save();
      res.redirect("back");
    } else {
      epLikes.push(req.user._id);
      foundFic.totalLikes++;
      foundFic.save();
      res.redirect("back");
    }
  })
});

// DESTROY ROUTE
router.delete("/:ep_num", middleware.checkFicOwnership, function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    const epLikes = foundFic.eps[req.params.ep_num - 1].likes;
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      res.redirect("back");
    } else {
      foundFic.totalLikes -= epLikes.length;
      foundFic.eps.splice(req.params.ep_num - 1, 1);
      foundFic.save();
      req.flash("success", "Episode deleted.");
      res.redirect("/fics/" + req.params.id);
    }
  });
});


module.exports = router;
