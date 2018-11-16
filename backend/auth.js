import passport from 'passport';
import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';

import config from '../config/config';

export default (app) => {
  const opts = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new Strategy(opts, function (payload, done) {
    return done(null, payload);
  }));

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt')
  };
}