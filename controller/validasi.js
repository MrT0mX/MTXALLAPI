"use strict";

const jwt = require("jsonwebtoken");
const { checkEmail } = require("../database/db");
const { mail } = require("./nodemailer");
const { user, jwtToken } = require("../library/settings");
const { getHashedPassword, randomText } = require("../library/functions");
const { sendMailRegister } = require("./nodemailer");
const { htmlRegister } = require("./config");

module.exports = async function (req, res, subject, next) {
  return new Promise(async (resolve, reject) => {
    let { username, email, password, confirmPassword } = req.body;
    let checking = await checkEmail(email);
    let data = {
      email: email,
      username: username,
      password: getHashedPassword(password),
      apikey: randomText(10),
    };
    let token = jwt.sign(data, jwtToken, { expiresIn: "1h" });
    let mailOptions = {
      from: user,
      to: email,
      subject,
      html: htmlRegister(`https://${req.hostname}/users/verify/${token}`),
    };
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (username.length < 1) {
      req.flash("error_msg", "Please Input Username");
      res.redirect("/users/register");
    } else if (email.length < 1) {
      req.flash("error_msg", "Please Input Email");
      res.redirect("/users/register");
    } else if (checking) {
      req.flash("error_msg", "A user with the same Email already exists");
      res.redirect("/users/register");
    } else if (password.length < 1) {
      req.flash("error_msg", "Please Input Password");
      res.redirect("/users/register");
    } else if (password.length < 8) {
      req.flash("error_msg", "Password must be at least 8 characters");
      res.redirect("/users/register");
    } else if (confirmPassword.length < 1) {
      req.flash("error_msg", "Please Input Confirm Password");
      res.redirect("/users/register");
    } else if (password !== confirmPassword) {
      req.flash("error_msg", "Password does not match");
      res.redirect("/users/register");
    } else if (!patternEmail.test(email)) {
      req.flash("error_msg", "Please enter gmail correctly");
      res.redirect("/users/register");
    } else {
      await sendMailRegister(mailOptions);
      resolve(data);
      req.flash(
        "success_msg",
        "Success Check Your Email In Folder All/Spam For Verifcation"
      );
      res.redirect("/users/login");
      next();
    }
  });
};
