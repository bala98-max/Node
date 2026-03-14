const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const transport = require("../config/mailer");

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

userSchema.post("save", async function (doc) {
  try {
    await transport.sendMail({
      from: '"Secure Finance" <no-replay@gmail.com>',
      to: doc.email,
      subject: "Welcome to Secure Finance",
      html: `
        <h2> Hello ${doc.name} </h2>
        <p> Your account has been created successfully. have a good Day ..! </p>
      `,
    });
    console.log("mail sent successfully");
  } catch (error) {
    console.log("unable to deliver a mail", error);
  }
});

module.exports = mongoose.model("User", userSchema);
