const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    amount: Joi.number().positive().required(),
    email: Joi.string().email().required(),
    currency: Joi.string().required(),
    paymentMethod: Joi.string().valid('fiat', 'crypto').required(),
  }),
};

const verifyPayment = {
  body: Joi.object().keys({
    reference: Joi.number().required()
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayment,
  verifyPayment,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
