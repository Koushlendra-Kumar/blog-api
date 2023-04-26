const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/User');

passport.use(
    'signup',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try {
                const user = await UserModel.create({ username, password });
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({username});
                if(!user) {
                    return done(null, false, {message: 'user not found'})
                }
                return done(null, user, {message: 'Logged in successfully!!'})
            } catch(err) {
                return done(err);
            }
        }
    )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);