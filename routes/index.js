const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Fic = require("./models/fic");

const router = express.Router();



// Routes =======================================
app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});





module.exports = router;
