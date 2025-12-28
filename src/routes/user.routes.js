const express = require("express");
const route = express.Router();

const userController = require("../controllers/user.controller");

route.post("/", userController.createUser);
route.patch("/update/:id", userController.updateUser);
route.delete("/delete/:id", userController.deleteUser);
route.post("/login", userController.loginUser);

module.exports = route;
