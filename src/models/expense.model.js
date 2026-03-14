const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    spendDate: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ user: 1, title: 1 });
expenseSchema.index({ user: 1, category: 1 });
expenseSchema.index({ user: 1, spendDate: 1 });
expenseSchema.index({ user: 1, createdAt: -1 });
module.exports = mongoose.model("Expense", expenseSchema);
