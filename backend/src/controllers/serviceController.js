import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  const services = await Service.find().sort({ title: 1 });
  return res.json(services);
};
