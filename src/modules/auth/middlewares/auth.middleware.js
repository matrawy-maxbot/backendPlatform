import passport from 'passport';

// Middleware للتحقق من المصادقة وإضافة المستخدم والـ role للـ req
export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    if (err) {
          res.status(401);
          return next(new Error(err));
    }

    if (!user) {
          res.status(401);
          return next(new Error('Unauthorized'));
    }

    if(!user.role) {
          res.status(401);
          return next(new Error('User does not have a role'));
    }

    req.user.role = user.role || 'user';

    next(); // استمر للـ route اللي بعده
  })(req, res, next);
};
