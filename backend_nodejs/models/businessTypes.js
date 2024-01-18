const mongoose = require("mongoose");

const BusinessTypesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    enum: ["coffee-shop", "security", "market", "cafe", "other"],
  },
  description: {
    type: String,
    required: true,
  },
});

const BusinessType = mongoose.model("BusinessType", BusinessTypesSchema);

module.exports = BusinessType;
