const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/[w{3}.]?[\S^а-яё]/gi.test(value);
      },
      message: 'Неверная ссылка на постер к фильму',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/[w{3}.]?[\S^а-яё]/gi.test(value);
      },
      message: 'Неверная ссылка на трейлер фильма',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /https?:\/\/[w{3}.]?[\S^а-яё]/gi.test(value);
      },
      message: 'Неверная ссылка на миниатюрное изображение постера к фильму',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  }
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);