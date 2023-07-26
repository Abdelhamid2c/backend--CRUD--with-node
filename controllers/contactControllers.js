// npm i express-async-handler

const asynchandler = require("express-async-handler");

//@des get all contacts
//@route GET /contacts
//@access public

const getAllContacts = asynchandler(async (req, res) => {
  res.status(200).json({ message: "get all contacts" });
});

//@des get contact
//@route GET /contacts
//@access public

const getContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
});

//@des delete contact
//@route delete /contacts/:id
//@access public

const deleteContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

//@des create contact
//@route post /contacts/:id
//@access public

const createContact = asynchandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("tous les champs sont obligatoire");
  }
  res.status(201).json({ message: "create contact " });
});

//@des update contact
//@route put /contacts/:id
//@access public

const updateContact = asynchandler(async (req, res) => {
  res.status(200).json({ message: `upade contact for ${req.params.id}` });
});

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
};
