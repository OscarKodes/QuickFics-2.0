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
  bgColor: String,
  char: [String],
  text: [String],
  fontColor: [String],
  highlight: [String]
}

const ficSchema = new mongoose.Schema({
  title: String,
  description: String,
  chars: [charSchema],
  eps: [epSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Fic", ficSchema);
