const express = require("express");
const User = require("../models/user.js");
const middleware = require("../middleware");
const router = express.Router({mergeParams: true});

// SavedFics INDEX ROUTE ==============
router.get("/", middleware.isLoggedIn, function(req, res){
  res.send("SavedFics IndexRoute success");
});

// SavedFics NEW ROUTE ==============
// No need to render a form for new savedFic, 'Save Fic' button is enough

// SavedFics CREATE ROUTE ==============
// Save the id of curr Fic into User

// SavedFics SHOW ROUTE ==============
// No need. Index Route is enough.

// SavedFics EDIT ROUTE ==============
// No need. A delete route is all we need.

// SavedFics UPDATE ROUTE ==============
// No need. A delete route is all we need.

// SavedFics DESTROY ROUTE ==============
// Find user, remove the saved fic


module.exports = router;
