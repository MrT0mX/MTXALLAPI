"use strict";
const {
  limitCount,
  limitPremium,
  dateLimit,
  profilePath,
} = require("../library/settings");
const { User } = require("./model");

function tanggal() {
  var myMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  var myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum at",
    "Sabtu",
  ];
  var tgl = new Date();
  var day = tgl.getDate();
  var bulan = tgl.getMonth();
  var thisDay = tgl.getDay();
  var ThisDay = myDays[thisDay];
  var yy = tgl.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  return `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
}

exports.addUser = (email, username, password, apikey) => {
  let obj = {
    email,
    username,
    password,
    apikey,
    limiter: dateLimit,
    limit: limitCount,
    since: tanggal(),
    url: profilePath,
    premium: false,
    verif: true,
  };
  User.create(obj);
};

exports.checkEmail = async (gmail) => {
  let users = await User.findOne({
    email: gmail,
  });
  if (users !== null) {
    return users.email;
  } else {
    return false;
  }
};

async function checkUsername(username) {
  let users = await User.findOne({ username: username });
  if (users !== null) {
    return users.username;
  } else {
    return false;
  }
}
module.exports.checkUsername = checkUsername;

async function resetAllLimit() {
  let users = await User.find({});
  users.forEach(async (data) => {
    let { premium, username } = data;
    if (premium !== null) {
      return User.updateOne(
        { username: username },
        { limit: limitPremium },
        function (err, res) {
          if (err) throw err;
        }
      );
    } else {
      return User.updateOne(
        { username: username },
        { limit: limitCount },
        function (err, res) {
          if (err) throw err;
        }
      );
    }
  });
}
module.exports.resetAllLimit = resetAllLimit;
