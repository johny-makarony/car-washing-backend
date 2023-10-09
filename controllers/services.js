const { Service } = require("../models/service");

const { ctrlWrapper } = require("../helpers");

const addService = async (req, res) => {
  const result = await Service.create({
    ...req.body,
  });

  res.status(201).json(result);
};

const getAllServices = async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Service.find({}, "-createAt -updateAt", {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = {
  addService: ctrlWrapper(addService),
  getAllServices: ctrlWrapper(getAllServices),
};
