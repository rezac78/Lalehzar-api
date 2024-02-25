const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dpr146vr2/image/upload/v1708409354/Lalehzar/w51pdunaeszzsmuzh2wp.webp",
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return value === defaultPhotoUrl || urlPattern.test(value);
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
