const express = require("express");
const mongoose = require("mongoose");

const userSchema = {
  username: String,
  password: String
};

module.exports = mongoose.model("User", userSchema);
