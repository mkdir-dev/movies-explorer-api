const router = require('express').Router();

const { getMovies, createMovies } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovies);

module.exports = router;

/*
# возвращает все сохранённые пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image,
# trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/movieId
*/