require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');

const helmet = require('helmet');

const { routes } = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./erros/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS, PORT } = require('./config');
const limiter = require('./middlewares/limiter');

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(requestLogger);

app.use(limiter);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://bakay.nomoredomains.work',
      'https://bakay.nomoredomains.work',
      'https://api.nomoreparties.co/beatfilm-movies',
    ],
    credentials: true,
  }),
);

app.use(bodyParser.json()); // сборка json-формата
app.use(bodyParser.urlencoded({ extended: true })); // прием web-страниц

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресур не найден'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect(DB_ADDRESS);
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Starting app on port ${PORT}`);
  });
}

main();
