const express = require("express");
const route = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

route.post("/", userController.createUser);
route.patch("/update", authMiddleware, userController.updateUser);
route.delete("/delete", authMiddleware, userController.deleteUser);
route.post("/login", userController.loginUser);

module.exports = route;
