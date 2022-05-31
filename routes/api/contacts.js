const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const createError = require("../../errors");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const all = await contacts.listContacts();
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
});

router.get("/:id", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const newContact = await contacts.addContact(name, email, phone);
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
});

router.delete("/:id", async (req, res, next) => {
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
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "Missing fields");
    }
    const updatedContact = await contacts.updateContact(id, name, email, phone);
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
});

module.exports = router;
