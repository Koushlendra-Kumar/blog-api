const express = require('express');
const passport = require('passport');

const userController = require('../controllers/userController');

const router = express.Router();

/* POST Sign Up. */
router.post('/signup',passport.authenticate('signup', {session: false}), userController.post_singup);

/* POST Login */
router.post('/login', userController.post_login);

router.post('/forgot-password', userController.post_forgot_password);

module.exports = router;
