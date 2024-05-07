const mongoose = require("mongoose");
const { expiredTokenDb } = require("../library/settings");

const Users = mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apikey: {
      type: String,
    },
    limiter: {
      type: String,
    },
    limit: {
      type: Number,
    },
    since: {
      type: String,
    },
    url: {
      type: String,
    },
    premium: {
      type: Boolean,
    },
    verif: {
      type: Boolean,
    },
    resetPassword: {
      type: String,
    },
    /**hitCount: {
		type: Number
	}**/
  },
  { versionKey: false }
);

module.exports.User = mongoose.model("api", Users);

const Utils = mongoose.Schema(
  {
    total: { type: Number },
    today: { type: Number },
    visitor: { type: Number },
    util: { type: String },
  },
  { versionKey: false }
);
module.exports.Utils = mongoose.model("util", Utils);

const Token = mongoose.Schema(
  {
    token: { type: String },
    expire_at: {
      type: Date,
      default: Date.now,
      expires: expiredTokenDb,
    },
  },
  { versionKey: false }
);
module.exports.Token = mongoose.model("token", Token);
