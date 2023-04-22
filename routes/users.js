const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* POST Sign Up. */
router.post('/signup', userController.post_singup);

/* POST Login */
router.post('/', userController.post_login);

router.post('/forgot-password', userController.post_forgot_password);

module.exports = router;
