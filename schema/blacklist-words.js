const mongoose = require("mongoose");

const schema =  mongoose.Schema({
  Guild: String,
  Word: String
});

const model = mongoose.model("blacklist-word", schema);
module.exports = model;