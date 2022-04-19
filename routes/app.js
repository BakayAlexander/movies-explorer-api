const express = require('express');
const { authRoutes } = require('./authRoutes');
const auth = require('../middlewares/auth');

const routes = express.Router();
const { moviesRoutes } = require('./moviesRoutes');
const { usersRoutes } = require('./usersRoutes');

routes.use('/users', auth, usersRoutes);
routes.use('/movies', auth, moviesRoutes);
routes.use('/', authRoutes);

exports.routes = routes;
