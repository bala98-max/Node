const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, expenseController.createExpense);
router.patch("/update/:id", authMiddleware, expenseController.updateExpense);
router.delete("/delete/:id", authMiddleware, expenseController.deleteExpense);
router.get("/", authMiddleware, expenseController.getExpense);

module.exports = router;
