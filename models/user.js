const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  googleId: String,
  facebookId: String,
  fics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fic"
  }],
  savedFics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fic"
  }]
}, {
  timestamps: true
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
