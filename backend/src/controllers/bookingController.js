import axios from "axios";
import nodemailer from "nodemailer";
import Booking from "../models/Booking.js";

const normalizeWhatsAppNumber = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

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
    subject: `New Booking - ${booking.applianceType} [${booking.bookingRef}]`,
    html: `<h2>New Booking Received</h2>
      <p><strong>Booking Ref:</strong> ${booking.bookingRef}</p>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Appliance:</strong> ${booking.applianceType}</p>
      <p><strong>Brand:</strong> ${booking.brand || "N/A"}</p>
      <p><strong>Model:</strong> ${booking.model || "N/A"}</p>
      <p><strong>Tonnage:</strong> ${booking.tonnage || "N/A"}</p>
      <p><strong>Gas Type:</strong> ${booking.gasType || "N/A"}</p>
      <p><strong>Service:</strong> ${booking.serviceType}</p>
      <p><strong>Address:</strong> ${booking.address}</p>
      <p><strong>Date & Time:</strong> ${booking.date} ${booking.time}</p>
      <p><strong>Description:</strong> ${booking.description || "N/A"}</p>`
  });

  if (booking.email) {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: booking.email,
      subject: `Booking Confirmation - ParadipService [${booking.bookingRef}]`,
      html: `<h2>Booking Confirmed!</h2>
      <p>Hi ${booking.name},</p>
      <p>Your service booking has been received and confirmed.</p>
      <p><strong>Booking Reference:</strong> ${booking.bookingRef}</p>
      <p><strong>Service:</strong> ${booking.serviceType}</p>
      <p><strong>Scheduled Date & Time:</strong> ${booking.date} ${booking.time}</p>
      <p>Our team will contact you soon at ${booking.phone}.</p>
      <p>Thank you for choosing ParadipService!</p>`
    });
  }
};

const sendWhatsAppMessage = async (to, message) => {
  if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_TOKEN || !to || !message) {
    return;
  }

  await axios.post(
    process.env.WHATSAPP_API_URL,
    {
      to,
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

const sendWhatsAppBooking = async (booking) => {
  if (!process.env.WHATSAPP_TO) return;

  const acDetails = [booking.brand, booking.model, booking.tonnage, booking.gasType]
    .filter(Boolean)
    .join(", ");
  const message = `New booking from ${booking.name} (${booking.phone}) for ${booking.applianceType}${acDetails ? ` (${acDetails})` : ""} - ${booking.serviceType} on ${booking.date} ${booking.time}.`;

  await sendWhatsAppMessage(process.env.WHATSAPP_TO, message);
};

const sendWhatsAppStatusUpdate = async (booking) => {
  const enabled = String(process.env.WHATSAPP_STATUS_UPDATES_ENABLED || "false").toLowerCase() === "true";
  if (!enabled) return;
  const target = normalizeWhatsAppNumber(booking.phone);
  if (!target) return;

  const details = [booking.applianceType, booking.serviceType].filter(Boolean).join(" - ");
  const technicianText = booking.technicianName
    ? ` Technician: ${booking.technicianName}.`
    : "";

  const statusTemplates = {
    Pending: `Hello ${booking.name}, your booking is confirmed and currently Pending. Service: ${details}. Scheduled: ${booking.date} ${booking.time}.`,
    Assigned: `Hello ${booking.name}, your service request has been Assigned.${technicianText} Service: ${details}. Visit slot: ${booking.date} ${booking.time}.`,
    "In Progress": `Hello ${booking.name}, your service is now In Progress.${technicianText} We are working on: ${details}.`,
    Completed: `Hello ${booking.name}, your service has been Completed.${technicianText} Thank you for choosing ParadipService.`
  };

  const message = `${statusTemplates[booking.status] || `Hello ${booking.name}, your booking status is now ${booking.status}.`} Need help? Reply here or call us.`;
  await sendWhatsAppMessage(target, message);
};

export const createBooking = async (req, res) => {
  try {
    if (!req.body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

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
      booking,
      bookingRef: booking.bookingRef
    });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Booking creation failed" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments();

    return res.json({
      bookings,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to fetch bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status, technicianName } = req.body;
    const allowedStatuses = ["Pending", "Assigned", "In Progress", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const payload = { status };
    if (typeof technicianName === "string") {
      payload.technicianName = technicianName.trim();
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    try {
      await sendWhatsAppStatusUpdate(booking);
    } catch (error) {
      console.error("WhatsApp status update error:", error.message);
    }

    return res.json({ message: "Status updated", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to update booking" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (["Completed", "Cancelled"].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot cancel a ${booking.status.toLowerCase()} booking` });
    }

    booking.status = "Cancelled";
    await booking.save();

    const transporter = createTransport();
    if (transporter && booking.email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: booking.email,
        subject: `Booking Cancelled - ${booking.bookingRef}`,
        html: `<h2>Booking Cancelled</h2>
        <p>Hi ${booking.name},</p>
        <p>Your booking (${booking.bookingRef}) has been cancelled.</p>
        <p>If you have any questions, please contact us.</p>`
      });
    }

    return res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to cancel booking" });
  }
};
