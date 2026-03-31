import HeroSlide from "../models/HeroSlide.js";

export const getHeroSlides = async (req, res) => {
  const heroSlides = await HeroSlide.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
  return res.json(heroSlides);
};

export const getHeroSlidesAdmin = async (req, res) => {
  const heroSlides = await HeroSlide.find().sort({ sortOrder: 1, createdAt: -1 });
  return res.json(heroSlides);
};

export const createHeroSlide = async (req, res) => {
  const heroSlide = await HeroSlide.create(req.body);
  return res.status(201).json(heroSlide);
};

export const updateHeroSlide = async (req, res) => {
  const heroSlide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!heroSlide) {
    return res.status(404).json({ message: "Hero slide not found" });
  }
  return res.json(heroSlide);
};

export const deleteHeroSlide = async (req, res) => {
  const heroSlide = await HeroSlide.findByIdAndDelete(req.params.id);
  if (!heroSlide) {
    return res.status(404).json({ message: "Hero slide not found" });
  }
  return res.json({ message: "Hero slide deleted" });
};
