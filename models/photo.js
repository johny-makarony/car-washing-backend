const { Schema, model } = require("mongoose");
const joi = require("joi");

const photoGroupSchema = new Schema(
  {
    beforePhoto: Object,
    beforeAlt: String,
    afterPhoto: Object,
    afterAlt: String,
  },
  { versionKey: false, timestamps: true }
);

const addPhotosGroup = joi.object({
  beforePhoto: joi.object().messages({
    "object.base": "The beforePhoto field must be a object.",
  }),
  beforeAlt: joi.string().messages({
    "string.base": "The beforeAlt field must be a string.",
  }),
  afterPhoto: joi.object().messages({
    "object.base": "The afterPhoto field must be a object.",
  }),
  afterAlt: joi.string().messages({
    "string.base": "The afterAlt field must be a string.",
  }),
});

const Photo = model("photo", photoGroupSchema);

const schemas = { addPhotosGroup };

module.exports = { Photo, schemas };
