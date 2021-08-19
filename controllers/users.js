const User = require('../models/user');

const NotFoundError = require('../errors/404 - NotFoundError');
const BadRequestError = require('../errors/400 - BadRequestError');
const InternalServerError = require('../errors/500 - InternalServerError');

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные пользователя');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
    })
    .catch(next);
};