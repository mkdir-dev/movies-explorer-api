const router = require('express').Router();

const { getUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);

/*
GET /users/me
PATCH /users/me
*/

module.exports = router;