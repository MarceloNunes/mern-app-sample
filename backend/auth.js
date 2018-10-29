import passport from 'passport';
import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';

import config from '../config/config';

const jwt = 'jwt';

export default (aoo) => {
  const opts = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(jwt)
  };

  const strategy = new Strategy(opts, (payload, done) => {
    console.log(opts);
    console.log(payload);
    return done(null, true);
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate(jwt, config.jwtSession)
  }
}