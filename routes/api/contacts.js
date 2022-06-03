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

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validate(schemaCreate), createById);

router.delete("/:id", deleteById);

router.patch("/:id/favorite", validate(schemaPatch), updateSomething);

router.put("/:id", updateById);

module.exports = router;
