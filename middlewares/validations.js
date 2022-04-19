const { celebrate, Joi, Segments } = require('celebrate');
// const { regEx } = require('../config');

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

// const userIdValidation = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().alphanum().length(24),
//   }),
// });

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

// const validateAvatar = celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     avatar: Joi.string().pattern(regEx),
//   }),
// });

// const createCardValidation = celebrate({
//   [Segments.BODY]: Joi.object().keys({
//     name: Joi.string().min(2).max(30).messages({
//       'string.min': 'Имя должно быть длинее 2 символов',
//       'string.max': 'Имя должно быть короче 30 символов',
//     }),
//     link: Joi.string().pattern(regEx),
//   }),
// });

// const idValidation = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24),
//   }),
// });

module.exports = {
  register,
  validateProfile,
  // validateAvatar,
  // createCardValidation,
  // idValidation,
  // userIdValidation,
};
