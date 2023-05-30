const { CastError, ValidationError } = require('mongoose').Error;
const {
  BAD_REQUEST_ERROR_CODE,
  SERVER_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INCORRECT_DATA_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('./NotFoundError');
const ForbiddenError = require('./ForbiddenError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = (err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: INCORRECT_DATA_MESSAGE });
  }

  if (
    err instanceof NotFoundError
    || err instanceof ForbiddenError
    || err instanceof UnauthorizedError
  ) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR_CODE).send({
      message: CONFLICT_ERROR_MESSAGE,
    });
  }

  res
    .status(SERVER_ERROR_CODE)
    .send({ message: SERVER_ERROR_MESSAGE });

  return next();
};
