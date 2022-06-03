const { Contact } = require("../models/contacts");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

const addContact = async (contact) => {
  return Contact.create(contact);
};

const updateContact = async (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
