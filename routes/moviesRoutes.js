const express = require('express');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movieController');
const { idValidation, createMovieValidation } = require('../middlewares/validations');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovieValidation, createMovie);
moviesRoutes.delete('/:movieId', idValidation, deleteMovie);

exports.moviesRoutes = moviesRoutes;
