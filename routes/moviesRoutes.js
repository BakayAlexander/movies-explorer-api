const express = require('express');

const { getMovies, createMovie, deleteMovie } = require('../controllers/cardsController');
// const { createCardValidation, idValidation } = require('../middlewares/validations');

const moviesRoutes = express.Router();

// moviesRoutes.get('/', getMovies);
// moviesRoutes.post('/', createCardValidation, createMovie);
// moviesRoutes.delete('/:MovieId', idValidation, deleteCard);
// moviesRoutes.put('/:cardId/likes', idValidation, likeCard);
// moviesRoutes.delete('/:cardId/likes', idValidation, dislikeCard);

// Добавить валидацию!!!!!!!!!!
moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/:MovieId', deleteMovie);

exports.moviesRoutes = moviesRoutes;
