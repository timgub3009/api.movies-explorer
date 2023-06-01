const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET_KEY } = require('../utils/config');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET_KEY : 'some-secret-key',
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  req.user = payload;

  return next();
};
