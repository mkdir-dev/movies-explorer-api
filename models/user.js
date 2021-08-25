const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { userValidErr, authErr } = require('../errors/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: userValidErr.urlErrEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        Promise.reject(new Error(authErr.userUnauthError));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            Promise.reject(new Error(authErr.userUnauthError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);