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