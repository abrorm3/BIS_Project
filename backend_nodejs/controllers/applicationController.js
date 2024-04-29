const Application = require("../models/application");

module.exports = {
  getApplications: async (req, res) => {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createApplication: async (req, res) => {
    const application = new Application(req.body);
    try {
      await application.save();
      res.status(201).json(application);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getApplicationById: async (req, res) => {
    const id = req.params.id;
    try {
      const application = await Application.findById(id);
      if (!application) return res.status(404).json({ message: "Application not found" });
      res.json(application);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateApplication: async (req, res) => {
    const id = req.params.id;
    try {
      const application = await Application.findByIdAndUpdate(id, req.body, { new: true });
      if (!application) return res.status(404).json({ message: "Application not found" });
      res.json(application);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteApplication: async (req, res) => {
    const id = req.params.id;
    try {
      const application = await Application.findByIdAndDelete(id);
      if (!application) return res.status(404).json({ message: "Application not found" });
      res.json({ message: "Application deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
