import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../database/models/User.model.js';
import { JWT_SECRET } from '../../../config/security.config.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // بتاخد التوكن من الهيدر
  secretOrKey: JWT_SECRET, // المفتاح السري
};

export default new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id); // بتدور على المستخدم في الداتابيز
    if (user) {
      return done(null, user); // لو المستخدم موجود، كل تمام
    }
    return done(null, false); // لو مش موجود، رجّع false
  } catch (err) {
    return done(err, false); // لو حصلت مشكلة، رجّع error
  }
});
