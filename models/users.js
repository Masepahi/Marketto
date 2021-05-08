const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('../tools/validator');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "نام الزامیست"],
    trim: true,
    validate: validator.isLength,
  },
  lastName: {
    type: String,
    required: [true, "نام خانوادگی الزامیست"],
    trim: true,
    validate: validator.isLength,
  },
  userName: {
    type: String,
    required: [true, "نام کاربری الزامیست"],
    trim: true,
    unique: [true, "این نام کاربری قبلا انتخاب شده است"],
    validate: validator.isLength,
  },
  password: {
    type: String,
    required: [true, "رمز عبور الزامیست"],
    validate: validator.isPasswordOk,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "آدرس ایمیل الزامیست"],
    lowercase: true,
    trim: true,
    validate: validator.isEmail,
  },
  role: {
    type: String,
    enum: ["admin", "Admin", "Blogger", "blogger"],
    default: "blogger",
  },
  avatar: {
    type: String,
  }
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (this.isNew || this.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model("User", UserSchema);
