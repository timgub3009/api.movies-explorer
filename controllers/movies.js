const Movie = require('../models/movie');
const { CREATED_CODE, INCORRECT_MOVIEID_MESSAGE, MOVIE_REMOVAL_DENIED_MESSAGE } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => {
      res.status(CREATED_CODE).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(INCORRECT_MOVIEID_MESSAGE);
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(MOVIE_REMOVAL_DENIED_MESSAGE);
      } else {
        return Movie.deleteOne(movie).then(() => res.send(movie));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
