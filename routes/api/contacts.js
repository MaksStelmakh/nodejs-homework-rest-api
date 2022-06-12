const express = require("express");
const { schemaCreate, schemaPatch } = require("../../models/contacts");
const {
  getAll,
  getById,
  createById,
  updateById,
  deleteById,
  updateSomething,
} = require("../../controllers/contacts");
const { validate } = require("../../middleware/validate");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get("/", auth, getAll);

router.get("/:id", getById);

router.post("/", validate(schemaCreate), auth, createById);

router.delete("/:id", auth, deleteById);

router.patch("/:id/favorite", validate(schemaPatch), updateSomething);

router.put("/:id", updateById);

module.exports = router;
