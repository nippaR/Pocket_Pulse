const express = require('express');
const { body, validationResult } = require('express-validator');
const multer  = require('multer');
const protect = require('../middleware/authMiddleware');
const {
  getIncomes,
  getIncomeById,
  addIncome,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');

const router = express.Router();

// Multer disk storage configuration (stores files in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Express-validator rules for Income/Expense payloads
const rules = [
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),
  body('category')
    .isIn(['Rent', 'Deposit', 'Freelance', 'Other'])
    .withMessage('Category must be one of Rent, Deposit, Freelance, or Other'),
  body('type')
    .isIn(['Income', 'Expense'])
    .withMessage('Type must be either Income or Expense'),
  body('payer')
    .notEmpty()
    .withMessage('Payer is required'),
  body('dateReceived')
    .isISO8601()
    .withMessage('Date Received must be a valid date'),
];

// Middleware to consolidate validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(e => ({ field: e.param, message: e.msg })) });
  }
  next();
};

// Protect all /api/incomes routes with JWT
router.use(protect);

// GET all incomes, POST create new income
router
  .route('/')
  .get(getIncomes)
  .post(upload.single('file'), rules, validate, addIncome);

// GET, PUT, DELETE a single income by ID
router
  .route('/:id')
  .get(getIncomeById)
  .put(upload.single('file'), rules, validate, updateIncome)
  .delete(deleteIncome);

module.exports = router;
