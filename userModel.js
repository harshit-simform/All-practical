const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must provide a name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must provide an email!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "A user must provide a password!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "A user must provide a confirm password!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match. Please try again!",
    },
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
