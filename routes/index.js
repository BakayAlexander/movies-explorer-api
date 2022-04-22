const express = require('express');
const { authRoutes } = require('./authRoutes');
const auth = require('../middlewares/auth');

const routes = express.Router();
const { moviesRoutes } = require('./moviesRoutes');
const { usersRoutes } = require('./usersRoutes');
const { notFoundRoute } = require('./notFoundRoute');

routes.use('/api/users', auth, usersRoutes);
routes.use('/api/movies', auth, moviesRoutes);
routes.use('/api/', authRoutes);
routes.use('/', auth, notFoundRoute);

exports.routes = routes;
