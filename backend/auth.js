import passport from 'passport';
import mongoose from 'mongoose';
import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';

import config from '../config/config';

export default () => {
  const opts = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  passport.serializeUser((payload, done) => {
    done(null, payload);
  });

  passport.deserializeUser((payload, done) => {
    done(null, payload);
  });

  passport.use(new Strategy(opts, async (payload, done) => {
    const SessionModel = mongoose.model('sessions');

    const session = await SessionModel.findOne({
      iat: payload && payload.iat
    });

    if (session && session.active) {
      return done(null, payload);
    } else {
      return done(null, false);
    }
  }));

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt')
  };
}