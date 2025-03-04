import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick.js';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));

  const schemaToValidate = Joi.object(validSchema);

  const { error } = schemaToValidate.validate(object, { abortEarly: false, allowUnknown: true });

  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

export default validate;
