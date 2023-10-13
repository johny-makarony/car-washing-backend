const { Schema, model } = require("mongoose");
const joi = require("joi");

const { stringRegexp, phoneRegexp } = require("../utils");

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for employee"],
    },
    phone: String,
    criminal: Boolean,
    worksFromDate: String,
  },
  { versionKey: false, timestamps: true }
);

const addEmployeeSchema = joi.object({
  name: joi.string().pattern(stringRegexp).required().messages({
    "string.base": "The name field must be a string.",
    "string.pattern.base": "The name contains invalid characters.",
    "any.required": "The name field is required.",
  }),
  phone: joi.string().pattern(phoneRegexp).messages({
    "string.base": "The phone field must be a string.",
    "string.pattern.base": "Invalid phone number format.",
  }),
  criminal: joi.boolean().messages({
    "boolean.base": "The criminal field must be a boolean.",
  }),
  worksFromDate: joi.string().messages({
    "string.base": "The birthday field must be a string.",
  }),
});

const updateEmployeeSchema = joi
  .object({
    name: joi.string().min(2).max(30).pattern(stringRegexp).messages({
      "string.base": "The name field must be a string.",
      "string.min": "The name must have at least 2 characters.",
      "string.max": "The name must have at most 30 characters.",
      "string.pattern.base": "The name contains invalid characters.",
    }),
    phone: joi.string().pattern(phoneRegexp).messages({
      "string.base": "The phone field must be a string.",
      "string.pattern.base": "Invalid phone number format.",
    }),
    criminal: joi.string().pattern(stringRegexp).messages({
      "string.base": "The criminal field must be a string.",
      "string.pattern.base": "The criminal contains invalid characters.",
    }),
    worksFromDate: joi.string().messages({
      "string.base": "The birthday field must be a string.",
    }),
  })
  .or("name", "phone", "criminal", "worksFromDate");

const Employee = model("employee", employeeSchema);

const schemas = { addEmployeeSchema, updateEmployeeSchema };

module.exports = { Employee, schemas };
