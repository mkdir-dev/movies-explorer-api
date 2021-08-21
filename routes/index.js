const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

const NotFoundError = require('../errors/404 - NotFoundError');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;