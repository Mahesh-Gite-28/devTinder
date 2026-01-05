const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [4, "First name must be at least 4 characters"],
      maxlength: [15, "First name must be less than 15 characters"],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true
    },

    emailID: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address"
      }
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },

    age: {
      type: Number,
      min: [18, "Age must be at least 18"]
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "Gender must be male, female or others"
      }
    },

    photoUrl: {
      type: String,
      validate: {
        validator: value => !value || validator.isURL(value),
        message: "Invalid photo URL"
      }
    },

    skills: {
      type: [String],
      validate: {
        validator: arr => arr.length <= 20,
        message: "Maximum 20 skills allowed"
      }
    },

    about: {
      type: String,
      default: "This is a default about of user"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema, "Users");
