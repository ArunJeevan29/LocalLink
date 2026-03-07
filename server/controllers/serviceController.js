const Service = require("../models/Service");

const createService = async (req, res) => {
  try {
    if (req.user.role !== "provider") {
      return res.status(403).json({
        message: "Access denied. Only providers can create listings.",
      });
    }

    const { title, description, price, category, location } = req.body;

    const serviceCount = await Service.countDocuments({
      provider: req.user.id,
    });

    if (serviceCount >= 3) {
      return res.status(400).json({
        message: "Limit reached. You can only post a maximum of 3 services.",
      });
    }

    const exactDuplicate = await Service.findOne({
      provider: req.user.id,
      title: title,
    });
    if (exactDuplicate) {
      return res
        .status(400)
        .json({ message: "You already have a service with this exact title." });
    }

    const newService = await Service.create({
      provider: req.user.id,
      title,
      description,
      price,
      category,
      location,
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error(`Error in createService: ${error.message}`);
    res.status(500).json({ message: "Server error creating service." });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.status(200).json(services);
  } catch (error) {
    console.error(`Error in getServices: ${error.message}`);
    res.status(500).json({ message: "Server error fetching services." });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user.id });
    res.status(200).json(services);
  } catch (error) {
    console.error(`Error in getMyServices: ${error.message}`);
    res.status(500).json({ message: "Server error fetching your services." });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.provider.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this service" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(`Error in updateService: ${error.message}`);
    res.status(500).json({ message: "Server error updating service." });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.provider.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this service" });
    }

    await service.deleteOne();

    res
      .status(200)
      .json({ id: req.params.id, message: "Service deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteService: ${error.message}`);
    res.status(500).json({ message: "Server error deleting service." });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "-password");
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching service profile." });
  }
};

module.exports = {
  createService,
  getServices,
  getMyServices,
  updateService,
  deleteService,
  getServiceById,
};
