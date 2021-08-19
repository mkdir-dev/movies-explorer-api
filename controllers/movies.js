const Movie = require('../models/movie');

const BadRequestError = require('../errors/400 - BadRequestError');
const InternalServerError = require('../errors/500 - InternalServerError');

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

// вернуть все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new Error('NotFound'))
    .then((movies) => res.status(SUCCESS_OK).send({ movies }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
    })
    .catch(next);
};

// создать фильм с переданными данными в теле
module.exports.createMovies = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .orFail(new Error('NotFound'))
    .then((movie) => res.status(SUCCESS_OK).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации при создании фильма');
      } else if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при создании фильма');
      }
      throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
    })
    .catch(next);
};