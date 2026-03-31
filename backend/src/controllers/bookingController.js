import axios from "axios";
import nodemailer from "nodemailer";
import Booking from "../models/Booking.js";

const createTransport = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const sendBookingEmail = async (booking) => {
  const transporter = createTransport();
  if (!transporter) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: `New Booking - ${booking.applianceType}`,
    html: `<h2>New Booking Received</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Appliance:</strong> ${booking.applianceType}</p>
      <p><strong>Brand:</strong> ${booking.brand || "N/A"}</p>
      <p><strong>Model:</strong> ${booking.model || "N/A"}</p>
      <p><strong>Service:</strong> ${booking.serviceType}</p>
      <p><strong>Address:</strong> ${booking.address}</p>
      <p><strong>Date & Time:</strong> ${booking.date} ${booking.time}</p>
      <p><strong>Description:</strong> ${booking.description || "N/A"}</p>`
  });

  if (process.env.CUSTOMER_CONFIRMATION_EMAIL) {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CUSTOMER_CONFIRMATION_EMAIL,
      subject: "Booking Confirmation - ParadipService",
      text: `Hi ${booking.name}, your service booking has been received. Our team will contact you soon.`
    });
  }
};

const sendWhatsAppBooking = async (booking) => {
  if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_TOKEN || !process.env.WHATSAPP_TO) {
    return;
  }

  const message = `New booking from ${booking.name} (${booking.phone}) for ${booking.applianceType}${booking.brand ? ` (${booking.brand}${booking.model ? `, ${booking.model}` : ""})` : ""} - ${booking.serviceType} on ${booking.date} ${booking.time}.`;

  await axios.post(
    process.env.WHATSAPP_API_URL,
    {
      to: process.env.WHATSAPP_TO,
      type: "text",
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);

  try {
    await sendBookingEmail(booking);
  } catch (error) {
    console.error("Booking email error:", error.message);
  }

  try {
    await sendWhatsAppBooking(booking);
  } catch (error) {
    console.error("WhatsApp notification error:", error.message);
  }

  return res.status(201).json({
    message: "Booking created successfully",
    booking
  });
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return res.json(bookings);
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.json({ message: "Status updated", booking });
};
