const express = require("express");
const mongoose = require("mongoose");

const charSchema = {
  name: String,
  description: String,
};

const epSchema = {
  title: String,
  char: [charSchema],
  text: [String]
}

const ficSchema = new mongoose.Schema({
  title: String,
  description: String,
  chars: [charSchema],
  eps: [epSchema]
});

module.exports = mongoose.model("Fic", ficSchema);
