const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 15,
    },
  },
  { timestamps: true }
);
// password hasing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const genrateSalt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, genrateSalt);
});

module.exports = mongoose.model("User", userSchema);
