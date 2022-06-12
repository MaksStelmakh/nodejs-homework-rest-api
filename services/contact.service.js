const { Contact } = require("../models/contacts");

const listContacts = async (query) => {
  const { page = 1, limit = 50, favorite } = query;
  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;
  return Contact.find({ favorite }, {}, { skip, limit: +limit }).populate(
    "owner",
    "email subscription"
  );
};

const getContactById = async (id) => {
  return Contact.findById(id);
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete(id);
};

const addContact = async (contact, id) => {
  return Contact.create({ ...contact, owner: id });
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
