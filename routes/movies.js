const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

const {
  createMoviesValidation,
  movieIdValidation,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMoviesValidation, createMovies);
router.delete('/:movieId', movieIdValidation, deleteMovies);

module.exports = router;