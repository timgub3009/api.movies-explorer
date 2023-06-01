const CREATED_CODE = 201;
const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

const INCORRECT_DATA_MESSAGE = 'Переданы некорректные данные';
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким почтовым адресом уже зарегистрирован';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const INCORRECT_MOVIEID_MESSAGE = 'Нет фильма по указанному id';
const MOVIE_REMOVAL_DENIED_MESSAGE = 'Нельзя удалить чужой фильм';
const INCORRECT_USERID_MESSAGE = 'Пользователь не найден';
const SUCCESSFUL_LOGIN_MESSAGE = 'Аутентификация успешна!';
const SUCCESSFUL_LOGOUT_MESSAGE = 'Вы вышли из профиля';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const INCORRECT_INPUT_VALUES_MESSAGE = 'Неправильные почта или пароль';

const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_[\]+.~#?&[\]/=]*)$/;

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  regex,
  INCORRECT_DATA_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  INCORRECT_MOVIEID_MESSAGE,
  MOVIE_REMOVAL_DENIED_MESSAGE,
  INCORRECT_USERID_MESSAGE,
  SUCCESSFUL_LOGIN_MESSAGE,
  SUCCESSFUL_LOGOUT_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  INCORRECT_INPUT_VALUES_MESSAGE,
};
