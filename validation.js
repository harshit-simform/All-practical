const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);

const userSchema = Joi.object({
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

const feedbackSchema = Joi.object({
  userId: JoiObjectId()
    .required()
    .error(new Error('Feedback must have a userId!')),
  message: Joi.string()
    .required()
    .error(new Error('Feedback must have a review/message!')),
  category: Joi.string()
    .required()
    .error(new Error('Feedback must belong to a category!')),
  rating: Joi.number().min(1).max(5).messages({
    'number.min': 'Rating must be at least 1.',
    'number.max': 'Rating cannot exceed 5.',
  }),
});

// function for validating incoming data
function validateData(data, schema) {
  const validateSchema = schema === 'user' ? userSchema : feedbackSchema;

  const validationResult = validateSchema.validate(data);
  if (validationResult.error) {
    return [false, validationResult.error.message];
  }
  return [true];
}

module.exports = validateData;
