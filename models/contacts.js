const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("product", schema);

module.exports = {
  Contact,
  schemaPatch,
  schemaCreate,
};
