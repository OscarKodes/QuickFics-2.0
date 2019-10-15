// import schemas
const Fic = require("../models/fic");

// create object
let middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/login");
  }
}

middlewareObj.checkFicOwnership = function(req, res, next) {
  // check if user is logged in
  if (req.isAuthenticated()){

    // search of the current campground with id
    Fic.findById(req.params.id, function(err, foundFic){
      if (err) {
        console.log("THERE WAS AN ERROR:", err);
        res.redirect("back");
      } else {

        // does user own campground?
        if (foundFic.author._id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You do not have permission to do that.");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/login");
  }
}


// export object
module.exports = middlewareObj;
