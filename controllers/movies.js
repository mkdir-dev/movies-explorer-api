const Movie = require('../models/movie');

const BadRequestError = require('../errors/400 - BadRequestError');
const ForbiddenError = require('../errors/403 - ForbiddenError');
const NotFoundError = require('../errors/404 - NotFoundError');
const InternalServerError = require('../errors/500 - InternalServerError');

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

// вернуть все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new Error('NotFound'))
    .then((movies) => res.status(SUCCESS_OK).send(movies))
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
    .then((movie) => res.status(SUCCESS_OK).send(movie))
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

// удалить сохранённый фильм по id
module.exports.deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById(movieId)
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.status(SUCCESS_OK).send({
            message: 'Удаление фильма прошло успешно',
          }));
      } else {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при удалении фильма');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Запрашиваемый фильм пользователя не найден');
      }
      throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
    })
    .catch(next);
};