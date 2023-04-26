const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.post_login = async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }

exports.post_singup = (req, res, next) => {
    res.status(200).json({msg: 'Signed up successfully', user: req.user})
}

exports.post_forgot_password = (req, res, next) => {
    res.json({msg: 'Not implemented yet!'})
}