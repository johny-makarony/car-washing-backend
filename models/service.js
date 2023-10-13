const { Schema, model } = require("mongoose");
const joi = require("joi");

const serviceSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Авто", "Килим"],
    },
    name: String,
    pricePerMeter: Boolean,
    price: Number,
    employeePercent: Number,
  },
  { versionKey: false, timestamps: true }
);

const addServiceSchema = joi.object({
  category: joi.string().valid("Авто", "Килим").messages({
    "string.base": "The category field must be a string.",
    "string.valid":
      "The category field must have a value of 'Авто' or 'Килим'.",
  }),
  name: joi.string().messages({
    "string.base": "The name field must be a string.",
  }),
  pricePerMeter: joi.boolean().messages({
    "boolean.base": "The pricePerMeter field must be a boolean.",
  }),
  price: joi.number().messages({
    "string.base": "The price field must be a number.",
  }),
  employeePercent: joi.number().messages({
    "string.base": "The employeePercent field must be a number.",
  }),
});

const Service = model("service", serviceSchema);

const schemas = { addServiceSchema };

module.exports = { Service, schemas };
