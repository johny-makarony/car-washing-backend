const { Schema, model } = require("mongoose");
const joi = require("joi");

const { stringRegexp, phoneRegexp } = require("../utils");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    accessToken: String,
    refreshToken: String,
    phone: String,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = joi.object({
  name: joi.string().pattern(stringRegexp).required().messages({
    "string.base": "The name field must be a string.",
    "string.pattern.base": "The name contains invalid characters.",
    "any.required": "The name field is required.",
  }),
  email: joi.string().email().required().messages({
    "string.base": "The email field must be a string.",
    "string.email": "Invalid email format.",
    "any.required": "The email field is required.",
  }),
  password: joi.string().min(8).max(30).required().messages({
    "string.base": "The password field must be a string.",
    "string.min": "The password must have at least 8 characters.",
    "string.max": "The password must have at most 30 characters.",
    "any.required": "The password field is required.",
  }),
});

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.base": "The email field must be a string.",
    "string.email": "Invalid email format.",
    "any.required": "The email field is required.",
  }),
  password: joi.string().min(8).max(30).required().messages({
    "string.base": "The password field must be a string.",
    "string.min": "The password must have at least 8 characters.",
    "string.max": "The password must have at most 30 characters.",
    "any.required": "The password field is required.",
  }),
});

const updateSchema = joi
  .object({
    name: joi.string().pattern(stringRegexp).messages({
      "string.base": "The name field must be a string.",
      "string.pattern.base": "The name contains invalid characters.",
    }),
    email: joi.string().email().messages({
      "string.base": "The email field must be a string.",
      "string.email": "Invalid email format.",
    }),
    phone: joi.string().pattern(phoneRegexp).messages({
      "string.base": "The phone field must be a string.",
      "string.pattern.base": "Invalid phone number format.",
    }),
  })
  .or("name", "email", "phone");

const refreshSchema = joi.object({
  refreshToken: joi.string().required().messages({
    "string.base": "The refreshToken field must be a string.",
    "any.required": "The refreshToken field is required.",
  }),
});

const User = model("user", userSchema);

const schemas = { registerSchema, loginSchema, updateSchema, refreshSchema };

module.exports = { User, schemas };
