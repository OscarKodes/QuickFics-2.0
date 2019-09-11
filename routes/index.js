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





module.exports = router;
