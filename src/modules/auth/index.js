import passport from 'passport';
import jwtStrategy from './strategies/jwt.strategy.js';
import googleStrategy from './strategies/oauth.strategy.js';

// هنا بنفعّل الاستراتيجيات مع Passport
passport.use(jwtStrategy);
passport.use(googleStrategy);

export default passport;
