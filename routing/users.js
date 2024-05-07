"use strict";

const passport = require("passport");
const jwt = require("jsonwebtoken");
const time = require("moment-timezone");
const express = require("express");
const router = express.Router();
const Recaptcha = require("express-recaptcha").RecaptchaV2;

const validasi = require("../controller/validasi");
const { recaptchaKey, jwtToken } = require("../library/settings");
const { getJson, getHashedPassword } = require("../library/functions");
const { sendMailPassword } = require("../controller/nodemailer");
const { uploadByBuffer } = require("../controller/uploader");
const {
  notAuthenticated,
  isAuthenticated,
  reCaptchaLogin,
} = require("../library/authorized");
const { User } = require("../database/model");
const { addUser, checkEmail } = require("../database/db");
const recaptcha = new Recaptcha(
  recaptchaKey.v2SiteKey,
  recaptchaKey.v2SecretKey,
  {
    hl: "id",
    callback: "cb",
  }
);
let tokenize = new Array();

router.get("/verify/:id", async (req, res, next) => {
  let id = req.params.id;
  await jwt.verify(id, jwtToken, async function (error, decoded) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        req.flash("error_msg", "Token Expired, Please Register Again");
        res.redirect("/users/register");
      }
      if (error.name === "JsonWebTokenError") {
        req.flash(
          "error_msg",
          "Invalid Signature Token, Please Register Again"
        );
        res.redirect("/users/register");
      }
      if (error.name === "NotBeforeError") {
        req.flash("error_msg", "Token Not Active, Please Report to Owner");
        res.redirect("/users/register");
      }
    } else {
      if (!tokenize.includes(decoded.email)) {
        req.flash("warning_msg", "Your account already verified");
        res.redirect("/users/login");
      } else {
        console.log(
          `[ ${time.tz("Asia/Dhaka").format("HH:mm")} ] Email: ${
            decoded.email
          } Success Verified`
        );
        req.flash("success_msg", "Your Account Verified");
        res.redirect("/users/login");
        await addUser(
          decoded.email,
          decoded.username,
          decoded.password,
          decoded.apikey
        );
        for (let i = 0; i < tokenize.length; i++) {
          if (tokenize[i] === decoded.email) {
            await tokenize.splice(i, 1);
          }
        }
      }
    }
  });
});
router.get("/profile", isAuthenticated, async (req, res) => {
  const Users = req.user;
  let identifikasiMember = "Powered By MTX-API";
  res.render("profile", {
    member: identifikasiMember,
    username: Users.username,
    email: Users.email,
    apikey: Users.apikey,
    limit: Users.limit,
    limiter: Users.limiter,
    since: Users.since,
    premium: Users.premium,
    url: Users.url,
    verif: Users.verif,
    layout: "layouts/profile",
  });
});
router.get("/login", notAuthenticated, (req, res) => {
  res.render("login", {
    layout: "layouts/crud",
  });
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/docs",
    failureRedirect: "/users/login",
    //failureFlash: true,
  })(req, res, next);
});
router.get("/register", notAuthenticated, (req, res) => {
  res.render("register", {
    layout: "layouts/crud",
  });
});
router.post("/register", async (req, res, next) => {
  try {
    tokenize.push(req.body.email);
    return validasi(req, res, "API MTX || VERIFICATION", next);
  } catch (err) {
    console.log(err);
    req.flash("error_msg", "Error Can't Register Account");
    res.redirect("/users/register");
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

router.get("/update", (req, res) => {
  res.render("update", {
    layout: "layouts/crud",
  });
});
// updates users past bot/post
router.post("/updates", async (req, res) => {
  let { email, limit, expired, premium } = req.query;
  let checking = await checkEmail(email);
  let regex = new RegExp(
    /(0?[1-9]|[12][0-9]|3[01])[\/\,] ([A-Z][a-z]+) \d{4}$/m,
    "g"
  );
  let bool = ["false", "true"];
  const requests = (status, result) =>
    res.json({ status, creator: "MrTomXxX", result });
  if ((email.length || limit.length || expired.length) < 1) {
    requests("error_msg", "Masukkan input dengan benar");
  } else if (!checking) {
    requests("error_msg", "Email tidak terdaftar dalam database");
  } else if (!Number(limit)) {
    requests("error_msg", "Limit harus berupa angka");
  } else if (!regex.test(expired)) {
    requests("error_msg", "Format tanggal salah");
  } else if (!bool.includes(premium.toLowerCase())) {
    requests("error_msg", "Input premium harus berupa type boolean");
  } else {
    await User.findOneAndUpdate(
      { email: email },
      {
        limiter: expired,
        limit: limit,
        premium: premium.toLowerCase(),
      }
    );
    const anu = await User.findOne({ email: email });
    let resulter;
    try {
      resulter = await getJson(
        "https://api-fxc7.cloud.okteto.net//api/cekkey?apikey=" + anu.apikey,
        { method: "GET" }
      );
    } catch (er) {
      console.log(er);
      requests(false, undefined);
    } finally {
      requests(true, resulter.result);
    }
  }
});
router.post("/update", async (req, res) => {
  let { email, apikey, limit, expired, premium } = req.body;
  let checking = await checkEmail(email);
  let regex = new RegExp(
    /(0?[1-9]|[12][0-9]|3[01])[\/\,] ([A-Z][a-z]+) \d{4}$/m,
    "g"
  );
  let bool = ["false", "true"];
  if ((email.length || apikey.length || limit.length || expired.length) < 1) {
    req.flash("error_msg", "Isi dengan benar input");
    res.redirect("/users/update");
  } else if (!checking) {
    req.flash("error_msg", "Email tidak terdaftar dalam database");
    res.redirect("/users/update");
  } else if (!Number(limit)) {
    req.flash("error_msg", "Limit harus berupa angka");
    res.redirect("/users/update");
  } else if (!regex.test(expired)) {
    req.flash("error_msg", "Format tanggal salah");
    res.redirect("/users/update");
  } else if (!bool.includes(premium.toLowerCase())) {
    req.flash("error_msg", "input premium harus type boolean");
    res.redirect("/users/update");
  } else {
    await User.findOneAndUpdate(
      { email: email },
      {
        apikey: apikey,
        limiter: expired,
        limit: limit,
        premium: premium.toLowerCase(),
      }
    );
    req.flash("success_msg", "Sukses modified users");
    res.redirect("/docs");
  }
});
router.get("/settings", isAuthenticated, async (req, res) => {
  if (!req.user.premium) {
    req.flash("error_msg", "Anda bukan user premium.");
    res.redirect("/users/profile");
  } else {
    res.render("setting", {
      username: req.user.username,
      apikey: req.user.apikey,
      layout: "layouts/crud",
    });
  }
});
router.post("/settings", isAuthenticated, async (req, res) => {
  const users = req.user;
  const { username, apikey } = req.body;
  let profile;
  if (req.files) profile = req.files.profile;
  else profile = undefined;
  if (username.length < 1 && apikey.length < 1 && profile == undefined) {
    req.flash("warning_msg", "input tidak boleh kosong semua");
    res.redirect("/users/settings");
  } else if (
    username.length > 1 &&
    username !== users.username &&
    (apikey.length < 1 || apikey == users.apikey) &&
    !profile
  ) {
    await User.findOneAndUpdate({ _id: users.id }, { username: username });
    req.flash("success_msg", "sukses update username");
    res.redirect("/users/profile");
  } else if (
    ((username.length > 1 && username == users.username) ||
      username.length < 1) &&
    apikey.length > 1 &&
    apikey !== users.apikey &&
    !profile
  ) {
    await User.findOneAndUpdate({ _id: users.id }, { apikey: apikey });
    req.flash("success_msg", "sukses update apikey");
    res.redirect("/users/profile");
  } else if (
    username.length > 1 &&
    username !== users.username &&
    apikey.length > 1 &&
    apikey !== users.apikey &&
    !profile
  ) {
    await User.findOneAndUpdate(
      { _id: users.id },
      { username: username, apikey: apikey }
    );
    req.flash("success_msg", "sukses update username & apikey");
    res.redirect("/users/profile");
  } else if (
    username.length > 1 &&
    username !== users.username &&
    ((apikey.length > 1 && apikey == users.apikey) || apikey.length < 1) &&
    profile !== undefined
  ) {
    if (!/image|images/.test(profile.mimetype)) {
      req.flash("error_msg", "Only Images");
      res.redirect("/users/settings");
    } else {
      uploadByBuffer(profile.data, profile.mimetype)
        .then(async ({ link }) => {
          await User.findOneAndUpdate(
            { _id: users.id },
            { username: username, url: link }
          );
          req.flash("success_msg", "sukses update username & profile");
          res.redirect("/users/profile");
        })
        .catch((e) => {
          req.flash("error_msg", String(e));
          res.redirect("/users/profile");
        });
    }
  } else if (
    ((username.length > 1 && username == users.username) ||
      username.length < 1) &&
    apikey.length > 1 &&
    apikey !== users.apikey &&
    profile !== undefined
  ) {
    if (!/image|images/.test(profile.mimetype)) {
      req.flash("error_msg", "Only Images");
      res.redirect("/users/settings");
    } else {
      uploadByBuffer(profile.data, profile.mimetype)
        .then(async ({ link }) => {
          await User.findOneAndUpdate(
            {
              _id: users.id,
            },
            { apikey: apikey, url: link }
          );
          req.flash("success_msg", "sukses update apikey & profile");
          res.redirect("/users/profile");
        })
        .catch((e) => {
          req.flash("error_msg", String(e));
          res.redirect("/users/settings");
        });
    }
  } else if (
    ((username.length > 1 && username == users.username) ||
      username.length < 1) &&
    ((apikey.length > 1 && apikey == users.apikey) || apikey.length < 1) &&
    profile !== undefined
  ) {
    if (!/image|images/.test(profile.mimetype)) {
      req.flash("error_msg", "Only Images");
      res.redirect("/users/settings");
    } else {
      uploadByBuffer(profile.data, profile.mimetype)
        .then(async ({ link }) => {
          await User.findOneAndUpdate(
            {
              _id: users.id,
            },
            { url: link }
          );
          req.flash("success_msg", "sukses update profile");
          res.redirect("/users/profile");
        })
        .catch((e) => {
          req.flash("error_msg", String(e));
          res.redirect("/users/settings");
        });
    }
  } else if (
    username.length > 1 &&
    username !== users.username &&
    apikey.length > 1 &&
    apikey !== users.apikey &&
    profile !== undefined
  ) {
    if (!/image|images/.test(profile.mimetype)) {
      req.flash("error_msg", "Only Images");
      res.redirect("/users/settings");
    } else {
      uploadByBuffer(profile.data, profile.mimetype)
        .then(async ({ link }) => {
          await User.findOneAndUpdate(
            { _id: users.id },
            {
              username: username,
              apikey: apikey,
              url: link,
            }
          );
          req.flash("success_msg", "sukses update username & apikey & profile");
          res.redirect("/users/profile");
        })
        .catch((e) => {
          req.flash("error_msg", String(e));
          res.redirect("/users/settings");
        });
    }
  } else {
    req.flash("warning_msg", "Pilih salah satu yang mau diubah.");
    res.redirect("/users/settings");
  }
});
router.get("/forgotpassword", async (req, res) => {
  res.render("password", {
    layout: "layouts/crud",
  });
});
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const users = await User.findOne({
    email: email,
  });
  if (!users) {
    req.flash("error_msg", "Your email is not registered in the database");
    res.redirect(req.get("referer"));
  } else {
    const encode = jwt.sign(
      {
        tokenUsers: users._id,
        emailUsers: users.email,
      },
      jwtToken,
      {
        expiresIn: "1h",
      }
    );
    await User.updateOne(
      {
        email: email,
      },
      {
        resetPassword: encode,
      }
    );
    await sendMailPassword(
      email,
      req.protocol + "://" + req.hostname + "/users/newpassword/" + encode
    );
    req.flash(
      "success_msg",
      "Success please check your email to get the password reset link"
    );
    res.redirect("/users/login");
  }
});
router.get("/newpassword/:token", async (req, res, next) => {
  let token;
  if (!token) token = req.params.token;
  else token = null;
  const userToken = await User.findOne({
    resetPassword: token,
  });
  if (!userToken || userToken.resetPassword == "done") {
    req.flash("error_msg", "Your token invalid");
    res.redirect("/users/forgotpassword");
  } else {
    res.render("resetpassword", {
      token: token,
      layout: "layouts/crud",
    });
  }
});
router.post("/newpassword/:token", async (req, res) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  if (password.length < 8) {
    req.flash("error_msg", "Password must be at least 8 Characters");
    res.redirect(req.get("referer"));
  } else if (password !== confirmPassword) {
    req.flash("error_msg", "Password does not match");
    res.redirect(req.get("referer"));
  } else {
    const decode = jwt.verify(token, jwtToken);
    await User.findOneAndUpdate(
      {
        _id: decode.tokenUsers,
      },
      {
        password: getHashedPassword(password),
        resetPassword: "done",
      }
    );
    console.log(
      `[ ${time.tz("Asia/Dhaka").format("HH:mm")} ] Email: ${
        decode.emailUsers
      } Success change Password`
    );
    req.flash("success_msg", "Success change Password");
    res.redirect("/users/login");
  }
});

module.exports = router;
