const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Fic = require("../models/fic");

const router = express.Router();



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
  res.send("Register post route success");
});

//Login render form
router.get("/login", function(req, res){
  res.render("login");
})

//Login process user
router.post("/login", function(req, res){
  res.send("Login post route success");
});

//Logout


module.exports = router;
