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
    country: Joi.string().required().min(2).max(300).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'string.max': 'Поле должно быть короче 30 символов',
      'any.required': 'Укажите страну',
    }),
    director: Joi.string().required().min(2).max(300).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'string.max': 'Поле должно быть короче 30 символов',
      'any.required': 'Укажите режиссера',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Укажите продолжительность',
    }),
    year: Joi.string().required().min(2).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'any.required': 'Укажите год',
    }),
    description: Joi.string().required().min(2).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'any.required': 'Укажите описание',
    }),
    image: Joi.string().required().pattern(urlRegEx).messages({
      'any.required': 'Укажите картинку',
    }),
    trailerLink: Joi.string().required().pattern(urlRegEx).messages({
      'any.required': 'Укажите ссылку на трейлер',
    }),
    thumbnail: Joi.string().required().pattern(urlRegEx).messages({
      'any.required': 'Укажите ссылку на постер',
    }),
    nameRU: Joi.string().required().min(2).max(300).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'string.max': 'Поле должно быть короче 300 символов',
      'any.required': 'Укажите название фильма',
    }),
    nameEN: Joi.string().required().min(2).max(300).messages({
      'string.min': 'Поле должно быть длинее 2 символов',
      'string.max': 'Поле должно быть короче 300 символов',
      'any.required': 'Укажите название фильма',
    }),
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
