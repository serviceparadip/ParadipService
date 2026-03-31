import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  return res.status(201).json({ message: "Enquiry sent successfully", contact });
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return res.json(contacts);
};
