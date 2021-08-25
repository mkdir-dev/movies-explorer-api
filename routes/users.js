const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;