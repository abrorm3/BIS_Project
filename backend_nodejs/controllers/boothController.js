const Booth = require("../models/boothSchema"); // Adjust the path based on your project structure

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
}

module.exports = new BoothController();
