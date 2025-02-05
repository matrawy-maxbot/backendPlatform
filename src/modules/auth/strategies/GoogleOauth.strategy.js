import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../config/integratedAuth.config.js';
import User from '../../database/models/User.model.js';

export default new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback', // اللينك اللي Google هترجع عليه بعد تسجيل الدخول
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id }); // دور على المستخدم اللي عنده الـ googleId ده
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      }); // لو مش موجود، أنشئ واحد جديد
    }
    return done(null, user); // رجّع المستخدم
  } catch (err) {
    return done(err, null); // لو حصلت مشكلة، رجّع error
  }
});
