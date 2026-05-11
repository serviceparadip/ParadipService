import Pricing from "../models/Pricing.js";

export const getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find().sort({ category: 1, serviceName: 1 });
    return res.json(pricing);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to fetch pricing" });
  }
};

export const createPricing = async (req, res) => {
  try {
    const pricing = await Pricing.create(req.body);
    return res.status(201).json(pricing);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to create pricing" });
  }
};

export const updatePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pricing) {
      return res.status(404).json({ message: "Pricing item not found" });
    }
    return res.json(pricing);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to update pricing" });
  }
};

export const deletePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: "Pricing item not found" });
    }
    return res.json({ message: "Pricing item deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to delete pricing" });
  }
};
