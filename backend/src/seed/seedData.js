import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import HeroSlide from "../models/HeroSlide.js";
import Pricing from "../models/Pricing.js";
import Service from "../models/Service.js";
import Testimonial from "../models/Testimonial.js";

dotenv.config();

const pricingData = [
  { category: "AC", serviceName: "Visit Charge", price: "INR 350", description: "Inspection visit charge" },
  { category: "AC", serviceName: "Service Charge", price: "INR 550 + spares", description: "Standard AC service" },
  { category: "AC", serviceName: "Installation", price: "INR 1200 + spares", description: "AC installation" },
  { category: "AC", serviceName: "Dismantling", price: "INR 600", description: "AC dismantling service" },
  { category: "AC", serviceName: "Servicing", price: "INR 600", description: "AC routine servicing" },
  { category: "AC", serviceName: "Liquid Servicing", price: "INR 750", description: "Advanced liquid servicing" },
  { category: "AC", serviceName: "Gas Filling R22 1 Ton", price: "INR 1600", description: "R22 gas refill" },
  { category: "AC", serviceName: "Gas Filling R22 1.5 Ton", price: "INR 2000", description: "R22 gas refill" },
  { category: "AC", serviceName: "Gas Filling R22 2 Ton", price: "INR 2500", description: "R22 gas refill" },
  { category: "AC", serviceName: "Gas Filling R410 1 Ton", price: "INR 2000", description: "R410 gas refill" },
  { category: "AC", serviceName: "Gas Filling R410 1.5 Ton", price: "INR 2500", description: "R410 gas refill" },
  { category: "AC", serviceName: "Gas Filling R410 2 Ton", price: "INR 3000", description: "R410 gas refill" },
  { category: "Refrigerator", serviceName: "Visit", price: "INR 300", description: "Inspection visit charge" },
  { category: "Refrigerator", serviceName: "Single Door", price: "INR 350 + spares", description: "Single door repair" },
  { category: "Refrigerator", serviceName: "Double Door", price: "INR 450 + spares", description: "Double door repair" },
  { category: "Refrigerator", serviceName: "Side-by-Side", price: "INR 600 + spares", description: "Side-by-side repair" },
  { category: "Refrigerator", serviceName: "Gas Filling", price: "INR 950 to INR 2500", description: "Refrigerator gas filling" },
  { category: "Washing Machine", serviceName: "Visit", price: "INR 250", description: "Inspection visit charge" },
  { category: "Washing Machine", serviceName: "Semi Auto", price: "INR 350", description: "Semi-auto washing machine repair" },
  { category: "Washing Machine", serviceName: "Automatic", price: "INR 550", description: "Automatic washing machine repair" },
  { category: "Washing Machine", serviceName: "Front Load", price: "INR 650", description: "Front load washing machine repair" },
  { category: "Odisha Repair Rate Card", serviceName: "Electrical Parts", price: "Variable", description: "Capacitors, PCB, contactor repairs" },
  { category: "Odisha Repair Rate Card", serviceName: "Minor Repairs", price: "Variable", description: "Tightening and leakage fixing" },
  { category: "Odisha Repair Rate Card", serviceName: "Installation and Reinstallation", price: "Variable", description: "Unit setup and relocation" },
  { category: "Odisha Repair Rate Card", serviceName: "Compressor and Gas Charging", price: "Variable", description: "Compressor work and gas charging" }
];

const serviceData = [
  {
    title: "AC Repair and Service",
    slug: "ac-repair-service",
    description: "Expert AC installation, gas filling, remote repair, and maintenance."
  },
  {
    title: "Refrigerator Repairing Service",
    slug: "refrigerator-repair",
    description: "Quick fridge diagnostics and reliable cooling restoration for all major brands."
  },
  {
    title: "Washing Machine Repairing Service",
    slug: "washing-machine-repair",
    description: "Semi-auto, automatic, and front-load washing machine solutions."
  },
  {
    title: "Microwave Oven Repairing",
    slug: "microwave-repair",
    description: "Fast microwave troubleshooting and component-level repair support."
  }
];

const heroSlideData = [
  {
    heading: "AIR CONDITIONER ON RENT SERVICE",
    subText: "No Need to Buy - Rent Air Conditioners at the Best Price in Bhubaneswar",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now",
    sortOrder: 1,
    isActive: true
  },
  {
    heading: "AC REPAIR AND INSTALLATION EXPERTS",
    subText: "Fast doorstep service for AC, Refrigerator, Washing Machine and Microwave",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now",
    sortOrder: 2,
    isActive: true
  },
  {
    heading: "TRUSTED SERVICE ACROSS ODISHA",
    subText: "Certified technicians, transparent pricing, and genuine spare parts",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now",
    sortOrder: 3,
    isActive: true
  }
];

const testimonialData = [
  {
    name: "Rakesh Nayak",
    role: "Homeowner",
    quote: "Booked AC servicing in the morning and technician arrived the same day. Great experience and fair pricing.",
    rating: 5,
    location: "Bhubaneswar",
    sortOrder: 1,
    isActive: true
  },
  {
    name: "Smita Das",
    role: "Working Professional",
    quote: "My refrigerator issue was fixed quickly and the team explained every step clearly. Highly recommended.",
    rating: 5,
    location: "Cuttack",
    sortOrder: 2,
    isActive: true
  },
  {
    name: "Arun Behera",
    role: "Restaurant Owner",
    quote: "Reliable support for regular maintenance and emergency repairs. Responsive team and professional work.",
    rating: 4,
    location: "Paradip",
    sortOrder: 3,
    isActive: true
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Pricing.deleteMany();
    await Service.deleteMany();
    await HeroSlide.deleteMany();
    await Testimonial.deleteMany();
    await Pricing.insertMany(pricingData);
    await Service.insertMany(serviceData);
    await HeroSlide.insertMany(heroSlideData);
    await Testimonial.insertMany(testimonialData);
    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
