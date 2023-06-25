const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { NODE_ENV, JWT_SECRET_KEY } = require('../utils/config');
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

function parseAuthorizationHeader(authorizationHeader) {
  const tokenRegex = /^Bearer\s+(.*)$/i;
  const match = authorizationHeader.match(tokenRegex);

  if (match && match[1]) {
    const token = match[1].trim();
    return token;
  }

  return null;
}

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }

  const token = parseAuthorizationHeader(authorizationHeader);

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
