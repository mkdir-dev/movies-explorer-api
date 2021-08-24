module.exports.userErr = {
  BadRequestError: 'Переданы некорректные данные пользователя',
  ValidationError: 'Ошибка валидации при создании пользователя',
  NotFoundError: 'Запрашиваемый пользователь не найден',
  ConflictError: 'Пользователь с таким Email уже зарегистрирован',
};

module.exports.userValidErr = {
  urlErrEmail: 'Неверная почта',
};

module.exports.movieErr = {
  BadRequestError: 'Переданы некорректные данные фильма',
  ValidationError: 'Ошибка валидации при создании фильма',
  ForbiddenError: 'Вы не можете удалять чужие фильмы',
  NotFoundError: 'Запрашиваемый фильм пользователя не найден',
};

module.exports.movieValidErr = {
  urlErrImage: 'Неверная ссылка на постер к фильму',
  urlErrTrailer: 'Неверная ссылка на трейлер фильма',
  urlErrThumbnail: 'Неверная ссылка на миниатюрное изображение постера к фильму',
};

module.exports.validErr = {
  urlErr: 'Неверный URL-адрес',
};

module.exports.authErr = {
  UnauthorizedError: 'Ошибка аутентификации',
  AuthRequired: 'Необходима авторизация',
  userUnauthError: 'Неправильные почта или пароль',
};

module.exports.serverErr = {
  NotFoundError: 'Запрашиваемый ресурс не найден',
  InternalServerError: 'Ошибка сервера. Ошибка по-умолчанию',
  ServerError: 'На сервере произошла ошибка',
};
