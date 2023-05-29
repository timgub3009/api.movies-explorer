const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET_KEY, CREATED_CODE } = require('../utils/config');

const getUser = (req, res, next) => {
  const data = req.user._id;

  User.findById(data)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const data = req.body;

  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const userData = user.toObject();
      res.status(CREATED_CODE).send(userData);
    })
    .catch(next);
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Аутентификация успешна!' });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res
    .clearCookie('jwt', {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    })
    .send({ message: 'Вы вышли из профиля' });
};

module.exports = {
  getUser,
  updateUser,
  register,
  logIn,
  logOut,
};
