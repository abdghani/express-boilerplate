const Joi = require('joi')
const schemas = {
  userAdd: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
    password: Joi.string().min(6).required()
  }),
  userLogin: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
}
module.exports = schemas
