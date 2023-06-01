const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // each IP to 100 requests per window
  message: 'Превышено количество запросов на сервер',
});

module.exports = limiter;
