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
  async fetchBooth(req, res) {
    try {
      const boothId = req.params.id;
      const booth = await Booth.findById(boothId);
      if (!booth) {
        return res.status(404).json({ error: "Booth not found" });
      }
      res.json(booth);
    } catch (error) {
      console.error("Error fetching booth:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async deleteProject(req, res) {
    const projectId = req.params.projectId;
    await Booth.findOneAndDelete({ _id: projectId });

    res.status(204).send();
  }
  catch(error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  async createProject(req, res) {
    try {
      console.log(req.body);
      const existingProject = await Booth.findOne({ title: req.body.title });
      if (existingProject) {
        return res.status(400).json({ message: "Project with this title already exists" });
      }
      const newProject = new Booth({
        title: req.body.title,
        imageUrls: req.body.imageUrls,
        location: req.body.location,
        businessType: req.body.businessType,
        dimensions: {
          width: req.body.dimensions.width,
          depth: req.body.dimensions.depth,
          height: req.body.dimensions.height,
        },
        doorType: req.body.doorType,
        foundation: req.body.foundation,
        roof: req.body.roof,
        insulation: req.body.insulation,
        floor: req.body.floor,
        facade: req.body.facade,
        electricity: req.body.electricity,
        additionalFeatures: [req.body.additionalFeatures] || ["not available"],
        price: req.body.price,
        adminName: req.body.adminName,
        productionTime: req.body.productionTime,
        inStock: req.body.inStock,
        htmlContent: req.body.htmlContent,
      });

      await newProject.save();

      return res.json({ message: "Project created successfully!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new BoothController();
