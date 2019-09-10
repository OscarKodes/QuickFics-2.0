// Requirements
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// Routes

app.get("/", function(req, res){
  res.send("Hello");
});









app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
