const contacts = require("../services/contact.service");
const createError = require("../errors");

const getAll = async (req, res, next) => {
  try {
    const all = await contacts.listContacts(req.query);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: all,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      throw createError(404, `Contact with id ${id} is not found`);
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          result: contact,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const createById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contact = req.body;
    const newContact = await contacts.addContact(contact, _id);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const contact = req.body;
    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, contact);
    if (updatedContact === null) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result: updatedContact,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await contacts.removeContact(id);
    if (deletedContact) {
      res.status(204).json({
        status: "success",
        code: 204,
        message: "Contact deleted",
        data: deletedContact,
      });
    } else {
      throw createError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateSomething = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, req.body);
    if (updatedContact === null) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result: updatedContact,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createById,
  updateById,
  deleteById,
  updateSomething,
};
