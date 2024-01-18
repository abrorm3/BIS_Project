const mongoose = require("mongoose");
const Booth = require("../models/boothSchema");
const BusinessType = require("../models/businessTypes");

class BoothController {
  async fetchBooths(req, res) {
    try {
      const booths = await Booth.find();
      res.json(booths);
    } catch (error) {
      console.error("Error fetching booths:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async populateBusinessTypes() {
    const businessTypesData = [
      {
        type: "coffee-shop",
        description: "A place that sells coffee and related items.",
      },
      {
        type: "security",
        description: "A business related to security services.",
      },
      {
        type: "market",
        description: "A place where goods are bought and sold.",
      },
      { type: "cafe", description: "Description for cafe" },
      { type: "other", description: "Description for other" },
    ];

    try {
      // Insert the sample data into the BusinessType collection
      const insertedTypes = await BusinessType.insertMany(businessTypesData);
      console.log("Business types inserted successfully:", insertedTypes);

      // Disconnect from MongoDB
      mongoose.disconnect();
    } catch (error) {
      console.error("Error populating business types:", error);
    }
  }
  async getAllBusinessTypes(req, res) {
    try {
      const businessTypes = await BusinessType.find();
      res.json(businessTypes);
    } catch (error) {
      console.error("Error fetching business types:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getBusinessTypeDetails(typeId) {
    try {
      const businessType = await BusinessType.findById(typeId);
      if (!businessType) {
        throw new Error("Business type not found");
      }

      const booths = await Booth.find({ businessType: typeId });

      return {
        businessType,
        booths,
      };
    } catch (error) {
      // console.error(error);
      throw new Error("Error fetching business type details");
    }
  }
}

module.exports = new BoothController();
