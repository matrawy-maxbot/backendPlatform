import express from 'express';
import passport from '../index.js'; // ده الملف الرئيسي اللي ربطنا فيه الاستراتيجيات

const router = express.Router();

// تسجيل الدخول بـ JWT
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'مرحبًا! انت مصدّق ومسموح ليك تشوف الصفحة دي.', user: req.user });
});

// تسجيل الدخول بـ Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ده الـ callback اللي Google هترجع عليه
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.json({ message: 'تم تسجيل الدخول بنجاح باستخدام Google.', user: req.user });
});

export default router;
