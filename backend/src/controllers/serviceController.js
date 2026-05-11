import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ title: 1 });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to fetch services" });
  }
};
