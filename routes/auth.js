const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    const existUser = await User.findOne({ userName: req.body.userName });

    if (existUser) {
      res.status(403).send({ message: "این نام کاربری قبلا انتخاب شده است" });
    } else {
      const newUser = await new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      });
      newUser.save();
      res.status(200).send({ msg: "ثبت نام با موفقیت انجام شد" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const password = req.body.password;
    const existUser = await User.findOne({
      $or: [
        { email: req.body.emailOrUserName },
        { userName: req.body.emailOrUserName },
      ],
    });

    let result;

    if (existUser) {
      result = bcrypt.compareSync(req.body.password, existUser.password);
    } else {
      res.status(404).send({ msg: "کاربری با این اطلاعات پیدا نشد" });
      res.end();
    }
 

    if (result) {
      req.session.user = existUser;
      res.status(200).send({ msg: "ورود موفقیت آمیز بود" });
    } 
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
      req.session.destroy((err) => {
          if(err) {
              return next(err);
          } else {
              req.session = null;

              return res.redirect('../');
          }
      });
  } catch (err) {
      res.status(500).send({ msg: err.message })
  }
});

router.get("/", async (req, res) => {
  try {
    res.render('auth');
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
})

module.exports = router;
