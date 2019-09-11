// Requirements =================================
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/ficsDB",
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const ficSchema = new mongoose.Schema({
  title: String,
  description: String
});

const Fic = mongoose.model("Fic", ficSchema);

const charSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Char = mongoose.model("Char", charSchema);

// Routes =======================================
app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});

// Fic Routes ===================================
// INDEX ROUTE
app.get("/fics", function (req, res){
  Fic.find({}, function(err, foundFics){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("fics/index", {fics: foundFics});
    }
  });
});

// NEW ROUTE
app.get("/fics/new", function(req, res){
  res.render("fics/new");
});

// CREATE ROUTE
app.post("/fics", function(req, res){

  Fic.create(req.body.fic, function(err, newFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/fics/" + newFic._id);
    }
  })
});

// SHOW ROUTE
app.get("/fics/:id", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("fics/show", {fic: foundFic});
    }
  });
});

// EDIT ROUTE
app.get("/fics/:id/edit", function(req, res){

  Fic.findById(req.params.id, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("fics/edit", {fic: foundFic});
    }
  })
});

// UPDATE ROUTE
app.put("/fics/:id", function(req, res){

  Fic.findByIdAndUpdate(req.params.id, req.body.fic, function(err, foundFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/fics/" + req.params.id);
    }
  })
})

// DESTROY ROUTE
app.delete("/fics/:id", function(req, res){

  Fic.findByIdAndDelete(req.params.id, function(err, deletedFic){
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.redirect("/fics");
    }
  })
});


// Char Routes ====================================
// INDEX ROUTE




app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
