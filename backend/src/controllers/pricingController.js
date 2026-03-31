import Pricing from "../models/Pricing.js";

export const getPricing = async (req, res) => {
  const pricing = await Pricing.find().sort({ category: 1, serviceName: 1 });
  return res.json(pricing);
};

export const createPricing = async (req, res) => {
  const pricing = await Pricing.create(req.body);
  return res.status(201).json(pricing);
};

export const updatePricing = async (req, res) => {
  const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pricing) {
    return res.status(404).json({ message: "Pricing item not found" });
  }
  return res.json(pricing);
};

export const deletePricing = async (req, res) => {
  const pricing = await Pricing.findByIdAndDelete(req.params.id);
  if (!pricing) {
    return res.status(404).json({ message: "Pricing item not found" });
  }
  return res.json({ message: "Pricing item deleted" });
};
