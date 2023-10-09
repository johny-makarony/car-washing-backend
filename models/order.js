const { Schema, model } = require("mongoose");
const Joi = require("joi");

const orderSchema = new Schema(
  {
    orderNumber: String,
    status: {
      type: String,
      required: true,
      enum: ["Нове", "В роботі", "Виконане", "Скасоване"],
      default: "Нове",
    },
    clientName: String,
    clientPhone: String,
    clientComment: String,
    orderDate: String,
    orderExecutionDate: String,
    washer: String,
    administrator: String,
    serviceObject: String,
    urgently: Boolean,
    services: Array,
    payment: {
      type: String,
      enum: ["Готівка", "Безготівка"],
    },
    totalCostOrder: Number,
    discountedCostOrder: Number,
    discountPercent: {
      type: Number,
      default: "0",
    },
    washerPayment: Number,
    administratorPayment: Number,
    revenue: Number,
  },
  { versionKey: false, timestamps: true }
);

const addOrderSchema = Joi.object({
  orderNumber: Joi.number().messages({
    "string.base": "The orderNumber field must be a string.",
  }),
  urgently: Joi.boolean().messages({
    "boolean.base": "The urgently field must be a boolean.",
  }),
  status: Joi.string()
    .valid("Нове", "В роботі", "Виконане", "Скасоване")
    .messages({
      "string.base": "The status field must be a string.",
      "string.valid":
        "Поле статусу має мати значення 'Нове', 'В роботі', 'Виконане' або 'Скасоване'.",
    }),
  clientName: Joi.string().messages({
    "string.base": "The clientName field must be a string.",
  }),
  clientPhone: Joi.string().messages({
    "string.base": "The clientPhone field must be a string.",
  }),
  clientComment: Joi.string().max(500).messages({
    "string.base": "The clientComment field must be a string.",
    "string.max": "The clientComment field must not exceed 500 characters.",
  }),
  orderDate: Joi.string().messages({
    "string.base": "The orderDate field must be a string.",
  }),
  orderExecutionDate: Joi.string().messages({
    "string.base": "The orderExecutionDate field must be a string.",
  }),
  washer: Joi.string().messages({
    "string.base": "The washer field must be a string.",
  }),
  administrator: Joi.string().messages({
    "string.base": "The administrator field must be a string.",
  }),
  serviceObject: Joi.string().messages({
    "string.base": "The serviceObject field must be a string.",
  }),
  services: Joi.array().messages({
    "array.base": "The services field must be a array.",
  }),
  payment: Joi.string().valid("Готівка", "Безготівка").messages({
    "string.base": "The payment field must be a string.",
    "string.valid": "Поле оплати має мати значення 'Готівка' або 'Безготівка'.",
  }),
  totalCostOrder: Joi.number().messages({
    "number.base": "The totalCostOrder field must be a number.",
  }),
  washerPayment: Joi.number().messages({
    "number.base": "The washerPayment field must be a number.",
  }),
  administratorPayment: Joi.number().messages({
    "number.base": "The administratorPayment field must be a number.",
  }),
  revenue: Joi.number().messages({
    "number.base": "The revenue field must be a number.",
  }),
  discountPercent: Joi.number().messages({
    "number.base": "The discountPercent field must be a number.",
  }),
});

const updateOrderSchema = Joi.object({
  status: Joi.string()
    .valid("Нове", "В роботі", "Виконане", "Скасоване")
    .messages({
      "string.base": "The status field must be a string.",
      "string.valid":
        "Поле статусу має мати значення 'Нове', 'В роботі', 'Виконане' або 'Скасоване'.",
    }),
  clientName: Joi.string().messages({
    "string.base": "The clientName field must be a string.",
  }),
  clientPhone: Joi.string().messages({
    "string.base": "The clientPhone field must be a string.",
  }),
  clientComment: Joi.string().max(500).messages({
    "string.base": "The clientComment field must be a string.",
    "string.max": "The clientComment field must not exceed 500 characters.",
  }),
  orderDate: Joi.string().messages({
    "string.base": "The orderDate field must be a string.",
  }),
  orderExecutionDate: Joi.string().messages({
    "string.base": "The orderExecutionDate field must be a string.",
  }),
  washer: Joi.string().messages({
    "string.base": "The washer field must be a string.",
  }),
  administrator: Joi.string().messages({
    "string.base": "The administrator field must be a string.",
  }),
  serviceObject: Joi.string().messages({
    "string.base": "The serviceObject field must be a string.",
  }),
  services: Joi.array().messages({
    "array.base": "The services field must be a array.",
  }),
  payment: Joi.string().valid("Готівка", "Безготівка").messages({
    "string.base": "The payment field must be a string.",
    "string.valid": "Поле оплати має мати значення 'Готівка' або 'Безготівка'.",
  }),
  totalCostOrder: Joi.number().messages({
    "number.base": "The totalCostOrder field must be a number.",
  }),
  discountedCostOrder: Joi.number().messages({
    "number.base": "The discountedCostOrder field must be a number.",
  }),
  washerPayment: Joi.number().messages({
    "number.base": "The washerPayment field must be a number.",
  }),
  administratorPayment: Joi.number().messages({
    "number.base": "The administratorPayment field must be a number.",
  }),
  revenue: Joi.number().messages({
    "number.base": "The revenue field must be a number.",
  }),
  discountPercent: Joi.number().messages({
    "number.base": "The discountPercent field must be a number.",
  }),
}).or(
  "status",
  "clientName",
  "clientPhone",
  "clientComment",
  "orderDate",
  "orderExecutionDate",
  "washer",
  "administrator",
  "serviceObject",
  "services",
  "payment",
  "totalCostOrder",
  "washerPayment",
  "administratorPayment",
  "revenue",
  "discountPercent"
);

const schemas = {
  addOrderSchema,
  updateOrderSchema,
};

const Order = model("order", orderSchema);

module.exports = { Order, schemas };
