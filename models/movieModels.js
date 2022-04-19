const mongoose = require('mongoose');
const { urlRegEx } = require('../config');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: urlRegEx,
      message: 'Указана неверная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: urlRegEx,
      message: 'Указана неверная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: urlRegEx,
      message: 'Указана неверная ссылка',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: String,
    required: true,
    unique: true,
  },

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
