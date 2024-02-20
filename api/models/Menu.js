const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [true, "Photo URL is required"],
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return urlPattern.test(value);
      },
      message: "Please enter a valid URL for the photo",
    },
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
  hashtags: {
    type: [String],
    required: [true, "At least one hashtag is required"],
    validate: {
      validator: function (value) {
        return value.length >= 1;
      },
      message: "Please provide at least one hashtag",
    },
  },
  available: {
    type: Boolean,
    required: [true, "Product availability is required"],
  },
});

module.exports = mongoose.model("Menu", productSchema);
