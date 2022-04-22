const express = require('express');

const notFoundRoute = express.Router();

notFoundRoute.all('/*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  return next();
});

exports.notFoundRoute = notFoundRoute;
