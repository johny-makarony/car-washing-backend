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
    "string.base": "Поле категорія повинно бути текстовим",
    "string.valid": "Поле категорія повинно мати значення 'Авто' або 'Килим'.",
  }),
  name: joi.string().messages({
    "string.base": "Поле ім'я повинно бути текстовим",
  }),
  pricePerMeter: joi.boolean().messages({
    "boolean.base": "Поле ціна за м² повинно бути булевим",
  }),
  price: joi.number().messages({
    "string.base": "Поле ціна повинно бути числовим",
  }),
  employeePercent: joi.number().messages({
    "string.base": "Поле відсоток працівнику повинно бути числовим",
  }),
});

const Service = model("service", serviceSchema);

const schemas = { addServiceSchema };

module.exports = { Service, schemas };
