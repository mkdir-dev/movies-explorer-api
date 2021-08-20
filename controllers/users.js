const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/400 - BadRequestError');
const UnauthorizedError = require('../errors/401 - UnauthorizedError');
const NotFoundError = require('../errors/404 - NotFoundError');
const ConflictError = require('../errors/409 - ConflictError');
const InternalServerError = require('../errors/500 - InternalServerError');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

// вернуть информацию о пользователе (email и имя)
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

// обновить информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
    })
    .catch(next);
};

// создать пользователя с переданными в теле
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 8)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then(() => res.status(SUCCESS_OK).send({
        email, name,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError('Ошибка валидации при создании пользователя');
        } else if (err.name === 'CastError') {
          throw new BadRequestError('Переданы некорректные данные при создании пользователя');
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError('Пользователь с таким Email уже зарегистрирован');
        }
        throw new InternalServerError('Ошибка сервера. Ошибка по-умолчанию');
      }))
    .catch(next);
};

// проверить переданные в теле почту и пароль и вернуть JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создать токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      // вернуть токен
      return res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Ошибка аутентификации');
    })
    .catch(next);
};