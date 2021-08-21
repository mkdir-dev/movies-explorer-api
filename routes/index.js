const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

module.exports = router;