// Requirements =================================
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

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


// Routes =======================================
app.get("/", function(req, res){
  res.redirect("/front");
});

app.get("/front", function(req, res){
  res.render("front");
});

// Fic Routes ===================================







app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
