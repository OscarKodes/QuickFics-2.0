const express = require("express");
const mongoose = require("mongoose");

const charSchema = {
  name: {type: String, trim: true},
  description: {type: String, trim: true},
  fontColor: String,
  highlight: String,
};

const epSchema = {
  title: {type: String, trim: true},
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
  title: {type: String, trim: true},
  description: {type: String, trim: true},
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
