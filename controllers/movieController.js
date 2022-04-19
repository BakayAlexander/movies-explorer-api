const { Movie } = require('../models/movieModels');
const ValidationError = require('../erros/ValidationError');
const NotFoundError = require('../erros/NotFoundError');
const ConflictError = require('../erros/ConflictError');

exports.getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;

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

    const movie = await Movie.create({
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
      owner,
    });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'MongoError' || err.code === 11000) {
      return next(new ConflictError('Фильм с таким id уже существует'));
    }
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Введены некорректные данные'));
    }
    return next(err);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const deletingMovieId = req.params.movieId;
    const movie = await Movie.findById(deletingMovieId);
    if (!movie) {
      return next(new NotFoundError('Карточка с указанным id не найдена'));
    }
    const movieOwner = movie.owner;
    if (userId.toString() === movieOwner.toString()) {
      const deleteCard = await Movie.findByIdAndRemove(deletingMovieId);
      return res.send(deleteCard);
    }
    return next(new ConflictError('Вы не можете этого сделать'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ValidationError('Данные не валидны'));
    }
    return next(err);
  }
};
