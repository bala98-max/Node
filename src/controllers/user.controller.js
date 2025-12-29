const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email and password fields are mandatory",
      });
    }

    const created = await new User({
      name,
      email,
      password,
    }).save();

    res.status(201).json({
      message: "User created successfully",
      data: {
        id: created._id,
        name: created.name,
        email: created.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to create a user",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const updated = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to update user",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const deleted = await User.findByIdAndDelete(userId);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete user",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log("req", req.headers);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "please enter the mandatory fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "please enter a valid username and password",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "please enter a valid email or password",
      });
    }
    const token = generateToken(user);
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "unable to login",
      error: error.message,
    });
  }
};

const generateToken = (data) => {
  const token = jwt.sign({ id: data._id }, jwtSecret, { expiresIn: "7d" });
  return token;
};
