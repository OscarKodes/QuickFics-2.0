const express = require("express");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const Fic = require("../models/fic");
const User = require("../models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const router = express.Router();

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      name: profile.displayName,
      googleId: profile.id,
      },
      function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({
      name: profile.displayName,
      facebookId: profile.id
      },
      function (err, user) {
      return cb(err, user);
    });
  }
));

// Routes=============================================
router.get("/google",
  passport.authenticate("google", {scope: ["profile"]})
);

router.get("/google/secrets", passport.authenticate("google",
  {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  }), function(req, res) {

  });

router.get("/facebook",
  passport.authenticate("facebook")
);

router.get("/facebook/secrets", passport.authenticate("facebook",
  {
    successRedirect: "/secrets",
    failureRedirect: "/login"
  }), function(req, res) {

  });








module.exports = router;
