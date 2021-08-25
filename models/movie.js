const mongoose = require('mongoose');

const validator = (value) => /https?:\/\/[w{3}.]?[\S^а-яё]/gi.test(value);
const { movieValidErr } = require('../errors/errorMessages');

const movieSchema = new mongoose.Schema({
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
      validator,
      message: movieValidErr.urlErrImage,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator,
      message: movieValidErr.urlErrTrailer,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator,
      message: movieValidErr.urlErrThumbnail,
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
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);