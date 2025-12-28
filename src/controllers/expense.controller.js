const Expense = require("../models/expense.model");

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, spendDate, notes } = req.body;

    if (!title || !amount || !category || !spendDate) {
      return res
        .status(400)
        .json("title, amount, category and spendDate are required");
    }

    const expense = new Expense({
      title,
      amount,
      category,
      spendDate,
      notes,
    });
    const saveExpense = await expense.save();
    res.status(201).json({
      message: "Expense Added",
      data: saveExpense,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const updated = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to update the document",
      error: err.message,
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete expense",
      error: error.message,
    });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Page and limit must be positive numbers" });
    }

    const skip = (page - 1) * limit;
    const totalCount = await Expense.countDocuments();
    const totalExpense = await Expense.find()
      .sort({ spendDate: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
      totalRecords: totalCount,
      data: totalExpense,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to get the data",
      error: err.message,
    });
  }
};
