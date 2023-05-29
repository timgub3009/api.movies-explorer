const userRouter = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { profileValidation } = require('../middlewares/validation');

userRouter.get('/me', getUser); // возвращает информацию о пользователе (email и имя)
userRouter.patch('/me', profileValidation, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = userRouter;
