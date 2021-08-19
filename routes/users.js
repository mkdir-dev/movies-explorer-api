const router = require('express').Router();

const { getUser } = require('../controllers/users');

router.get('/me', getUser);

/*
+++ GET /users/me
PATCH /users/me
*/

module.exports = router;