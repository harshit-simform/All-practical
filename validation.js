const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().error(new Error('User must Provide a name!')),
  email: Joi.string()
    .email()
    .required()
    .error(new Error('User must Provide an email!')),
  password: Joi.string()
    .min(8)
    .required()
    .error(new Error('User password must be at least 8 characters long!')),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .error(new Error('Confirm password must match the password!')),
});

// function for validating incoming data
function validateData(data) {
  const validationResult = schema.validate(data);
  if (validationResult.error) {
    return [false, validationResult.error.message];
  }
  return [true];
}

module.exports = validateData;
