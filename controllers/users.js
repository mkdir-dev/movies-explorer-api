const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/400 - BadRequestError');
const UnauthorizedError = require('../errors/401 - UnauthorizedError');
const NotFoundError = require('../errors/404 - NotFoundError');
const ConflictError = require('../errors/409 - ConflictError');
const InternalServerError = require('../errors/500 - InternalServerError');

const { userErr, authErr, serverErr } = require('../errors/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  SUCCESS_OK,
} = require('../errors/errorStatuses');

// вернуть информацию о пользователе (email и имя)
module.exports.getUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
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
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
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
          throw new BadRequestError(userErr.ValidationError);
        } else if (err.name === 'CastError') {
          throw new BadRequestError(userErr.BadRequestError);
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(userErr.ConflictError);
        }
        throw new InternalServerError(serverErr.InternalServerError);
      }))
    .catch(next);
};

// проверить переданные в теле почту и пароль и вернуть JWT
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError(authErr.UnauthorizedError);
    })
    .catch(next);
};