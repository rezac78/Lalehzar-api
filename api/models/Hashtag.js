const mongoose = require("mongoose");

const hashtagSchema = new mongoose.Schema({
  hashtag: {
    type: String,
    required: [true, "Hashtag is required"],
    unique: true, 
    trim: true, 
  },
});

const Hashtags = mongoose.model("Hashtags", hashtagSchema);

module.exports = Hashtags;
