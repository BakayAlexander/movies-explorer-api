const { celebrate, Joi, Segments } = require('celebrate');
const { urlRegEx } = require('../config');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
    email: Joi.string().required().email().messages({
      'any.required': 'Укажите email',
      'string.notEmail': 'Указан некорректный email',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Имя должно быть длинее 2 символов',
      'string.max': 'Имя должно быть короче 30 символов',
    }),
  }),
});

const validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Укажите email',
      'string.notEmail': 'Указан некорректный email',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Имя должно быть длинее 2 символов',
      'string.max': 'Имя должно быть короче 30 символов',
    }),
  }),
});

const createMovieValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().min(2).max(300),
    director: Joi.string().required().min(2).max(300),
    duration: Joi.number().required().min(2),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: Joi.string().required().pattern(urlRegEx),
    trailerLink: Joi.string().required().pattern(urlRegEx),
    thumbnail: Joi.string().required().pattern(urlRegEx),
    nameRU: Joi.string().required().min(2).max(300),
    nameEN: Joi.string().required().min(2).max(300),
    movieId: Joi.string().required(),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  register,
  validateProfile,
  createMovieValidation,
  idValidation,
};
