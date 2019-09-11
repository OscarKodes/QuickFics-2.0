const express = require("express");
const mongoose = require("mongoose");

const charSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const ficSchema = new mongoose.Schema({
  title: String,
  description: String,
  chars: [charSchema]
});

module.exports = mongoose.model("Fic", ficSchema);
