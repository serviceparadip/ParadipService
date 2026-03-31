import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
  return res.json(testimonials);
};

export const getTestimonialsAdmin = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 });
  return res.json(testimonials);
};

export const createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  return res.status(201).json(testimonial);
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }
  return res.json(testimonial);
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: "Testimonial not found" });
  }
  return res.json({ message: "Testimonial deleted" });
};
