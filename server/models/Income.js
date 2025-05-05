const { Schema, model } = require('mongoose');

const incomeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      default: 'Income',
      required: [true, 'Type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    category: {
      type: String,
      enum: ['Rent', 'Deposit', 'Freelance', 'Other'],
      required: [true, 'Category is required'],
    },
    payer: {
      type: String,
      required: [true, 'Payer is required'],
      trim: true,
    },
    dateReceived: {
      type: Date,
      required: [true, 'Date received is required'],
    },
    description: {
      type: String,
      maxlength: [300, 'Description cannot exceed 300 characters'],
      trim: true,
    },
    associatedRental: {
      type: String,
      required: [true, 'Associated rental is required'],
      trim: true,
    },
    receiptUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Income', incomeSchema);
