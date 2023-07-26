// npm i express-async-handler
const Contact = require("../models/contactModel");
const asynchandler = require("express-async-handler");

//@des get all contacts
//@route GET /contacts
//@access private

const getAllContacts = asynchandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@des get contact
//@route GET /contacts
//@access private

const getContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

//@des delete contact
//@route delete /contacts/:id
//@access private

const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to delete other user contact")
  }

  await contact.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

//@des create contact
//@route post /contacts/:id
//@access private

const createContact = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("tous les champs sont obligatoire");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@des update contact
//@route put /contacts/:id
//@access private

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User don't have permission to update other user contact")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
};
