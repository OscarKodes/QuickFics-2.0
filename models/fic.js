const express = require("express");
const mongoose = require("mongoose");

const charSchema = {
  name: String,
  description: String,
  fontColor: String,
  highlight: String,
};

const epSchema = {
  title: String,
  char: [String],
  text: [String]
}

const ficSchema = new mongoose.Schema({
  title: String,
  description: String,
  chars: [charSchema],
  eps: [epSchema]
});

module.exports = mongoose.model("Fic", ficSchema);
