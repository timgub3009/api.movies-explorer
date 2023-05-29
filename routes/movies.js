const moviesRouter = require('express').Router();
const { movieValidation, movieIdValidation } = require('../middlewares/validation');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');

moviesRouter.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
moviesRouter.post('/', movieValidation, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRouter.delete('/:movieId', movieIdValidation, deleteMovie); // удаляет сохранённый фильм по id

module.exports = moviesRouter;
