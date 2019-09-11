// Requirements =================================
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Fic = require("./models/fic");

const app = express();


// Require route module files
const ficRoutes = require("./routes/fics");
const indexRoutes = require("./routes/index");


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



app.use(indexRoutes);
app.use("/fics", ficRoutes);





app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
