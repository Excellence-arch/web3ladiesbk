const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createSponsor = {
  body: Joi.object().keys({
    FullName: Joi.string().required(),
    CompanyEmail: Joi.string().required().email(),
    CompanyName: Joi.string().required(),
    AreaOfSponsorship: Joi.string().required(),
    PaymentFrequency: Joi.string().required().valid("One-off","Monthly","Quarterly","Yearly")
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
  createSponsor,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
