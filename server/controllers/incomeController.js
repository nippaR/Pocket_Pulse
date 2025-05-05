const Income = require('../models/Income');

// GET /api/incomes
// Returns all incomes for the authenticated user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort('-dateReceived');
    return res.json(incomes);
  } catch (err) {
    console.error('Get Incomes Error:', err);
    return res.status(500).json({ message: 'Server error retrieving incomes' });
  }
};

// GET /api/incomes/:id
// Returns a single income by ID for the authenticated user
exports.getIncomeById = async (req, res) => {
  try {
    const inc = await Income.findOne({ _id: req.params.id, user: req.user.id });
    if (!inc) {
      return res.status(404).json({ message: 'Income not found' });
    }
    return res.json(inc);
  } catch (err) {
    console.error('Get Income By ID Error:', err);
    return res.status(500).json({ message: 'Server error retrieving income' });
  }
};

// POST /api/incomes
// Creates a new income record for the authenticated user
exports.addIncome = async (req, res) => {
  try {
    const payload = { ...req.body, user: req.user.id };
    if (req.file) {
      payload.receiptUrl = `/uploads/${req.file.filename}`;
    }
    const inc = await Income.create(payload);
    return res.status(201).json(inc);
  } catch (err) {
    console.error('Add Income Error:', err);
    return res.status(500).json({ message: 'Server error creating income' });
  }
};

// PUT /api/incomes/:id
// Updates an existing income record for the authenticated user
exports.updateIncome = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) {
      update.receiptUrl = `/uploads/${req.file.filename}`;
    }
    const inc = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true }
    );
    if (!inc) {
      return res.status(404).json({ message: 'Income not found' });
    }
    return res.json(inc);
  } catch (err) {
    console.error('Update Income Error:', err);
    return res.status(500).json({ message: 'Server error updating income' });
  }
};

// DELETE /api/incomes/:id
// Deletes an income record for the authenticated user
exports.deleteIncome = async (req, res) => {
  try {
    const inc = await Income.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!inc) {
      return res.status(404).json({ message: 'Income not found' });
    }
    return res.json({ message: 'Income deleted' });
  } catch (err) {
    console.error('Delete Income Error:', err);
    return res.status(500).json({ message: 'Server error deleting income' });
  }
};
