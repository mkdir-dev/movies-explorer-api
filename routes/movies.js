const router = require('express').Router();

const { getMovies } = require('../controllers/movies');

router.get('/', getMovies);

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