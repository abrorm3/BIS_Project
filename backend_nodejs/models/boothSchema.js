const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  imageUrls: [String],
  dimensions: {
    width: { type: Number },
    depth: { type: Number },
    height: { type: Number },
  },
  doorType: {
    type: String,
    required: true,
  },
  foundation: {
    type: String,
    required: true,
  },
  roof: {
    type: String,
    required: true,
  },
  insulation: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  facade: {
    type: String,
    required: true,
  },
  electricity: {
    type: String,
    required: false,
  },
  additionalFeatures: {
    type: [String],
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  productionTime: {
    type: Number,
    required: false,
  },
  inStock: {
    type: Boolean,
    required: false,
  },
  htmlContent: {
    type: String,
  },
});

const Booth = mongoose.model("Booth", boothSchema);

module.exports = Booth;
