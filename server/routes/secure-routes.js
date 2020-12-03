import express from 'express';

const router = express.Router();

// only verified users can access
router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      whatever: 'these are words',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

export default router;