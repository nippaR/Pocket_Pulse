const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Middleware to consolidate validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return an array of { field, message }
    return res.status(400).json({ errors: errors.array().map(err => ({ field: err.param, message: err.msg })) });
  }
  next();
};

// @route   POST /api/auth/signup
// @desc    Create a new user account
// @access  Public
router.post(
  '/signup',
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validate,
  signup
);

// @route   POST /api/auth/login
// @desc    Authenticate a user and return a JWT
// @access  Public
router.post(
  '/login',
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .exists()
    .withMessage('Password is required'),
  validate,
  login
);

module.exports = router;
