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
  highlight: [String],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
}

const ficSchema = new mongoose.Schema({
  title: String,
  description: String,
  chars: [charSchema],
  eps: [epSchema],
  totalLikes: {type: Number, default: 0},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Fic", ficSchema);
