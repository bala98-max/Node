const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

router.post("/", expenseController.createExpense);
router.patch("/update/:id", expenseController.updateExpense);
router.delete("/delete/:id", expenseController.deleteExpense);
router.get("/", expenseController.getExpense);

module.exports = router;
