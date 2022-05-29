const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(dataString);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === id);
  return contact ? contact : null;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const removedContact = allContacts.find((contact) => contact.id === id);
  if (!removedContact) {
    return null;
  }
  const updatedContacts = allContacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (id, name, email, phone) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  } else {
    allContacts[contactIndex].name = name;
    allContacts[contactIndex].email = email;
    allContacts[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[contactIndex];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
