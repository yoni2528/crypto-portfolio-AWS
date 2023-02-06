const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.ObjectId,
    ref: "Portfolio",
    cascade: true,
  },
  email: {
    type: String,
    required: [true, "a User must have email"],
    validate: [validator.isEmail, "Invalid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "a User must have password"],
    min: 4,
    max: 25,
    select: false,
  },
  firstName: {
    type: String,
    default: "John",
    min: [2, "firstName muse be at least 2 charcters"],
    max: [20, "firstName cant have more than 20 charcters"],
  },
  lastName: {
    type: String,
    default: "Doe",
    min: [2, "firstName muse be at least 2 charcters"],
    max: [20, "firstName cant have more than 20 charcters"],
  },
  image: {
    type: String,
    default: "default.png",
  },
  passwordConfirm: {
    type: String,
    required: [true, "a User must have password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Password must match! try again please!",
    },
  },
});

userSchema.methods.comparePassowrds = async function (
  userPassowrd,
  hashedPassowrd
) {
  const isSucceed = await bcrypt.compare(`${userPassowrd}`, hashedPassowrd);

  return isSucceed;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const encryptedPass = await bcrypt.hash(this.password, 12);
    this.password = encryptedPass;
    this.passwordConfirm = undefined;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
