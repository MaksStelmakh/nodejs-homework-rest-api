const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemaSubscr = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemaNewValidate = Joi.object({
  email: Joi.string().required(),
});

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: () => v4(),
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", schema);

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
  schemaSubscr,
  schemaNewValidate,
};
