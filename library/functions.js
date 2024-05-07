const crypto = require("crypto");
const { default: axios, isAxiosError } = require("axios");
const { performance } = require("perf_hooks");
const { User } = require("../database/model");
const filesize = require("../controller/filesize");
const { user } = require("./settings");
const pool =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567890".split("");
const creator = "MrtOmXX";
global.hitCount = { count: 0 };
/*
exports.hitCounter = async (add) => {
	const hit = await User.findOne({ gmail: user });
	await User.findOneAndUpdate({ gmail: user }, {
		hitCount: (hit.hitCount + add)
	});
	return hitCount.count = hit.hitCounter;
};*/
exports.getRoute = (request) => {
  const route = request.route ? request.route.path : ""; // check if the handler exist
  const baseUrl = request.baseUrl ? request.baseUrl : ""; // adding the base url if the handler is a child of another handler
  return route ? `${baseUrl === "/" ? "" : baseUrl}${route}` : undefined;
};
exports.regexUrl = (url) => {
  const regex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
    "gi"
  );
  return url.match(regex);
};
exports.getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};
exports.generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};
exports.randomText = (len) => {
  const result = [];
  for (let i = 0; i < len; i++)
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  return result.join("");
};
exports.getBuffer = async (url, response = {}) =>
  new Promise(async (resolve, reject) => {
    await axios
      .request({
        method: response.method || "GET",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
        },
        responseType: response.type || "arraybuffer",
      })
      .then(({ data }) => {
        if (isAxiosError()) throw "axios error";
        resolve(data);
      })
      .catch(reject);
  });
exports.getJson = (url, options = {}) =>
  new Promise(async (resolve, reject) => {
    await axios
      .request({
        method: options.method || "GET",
        url,
        headers: {
          ...options.headers,
        },
      })
      .then(({ data }) => {
        if (isAxiosError()) throw "axios error";
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
exports.resSukses = async (response, text) => {
  const newSpeed = performance.now();
  const oldSpeed = performance.now();
  await response.status(200).json({
    status: true,
    processed: oldSpeed - newSpeed + " Ms",
    creator,
    result: text,
  });
};
exports.resError = async (response, text) => {
  await response.status(200).json({
    status: false,
    creator,
    result: text,
  });
};
exports.h2k = (number) => {
  var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"];
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1) + "";
  if (/\.0$/.test(formatted));
  formatted = formatted.substr(0, formatted.length - 2);
  return formatted + postfix;
};
exports.formatSize = (number) => {
  fileSize = filesize.partial({ base: 2, standard: "jedec" });
  try {
    return fileSize(number);
  } catch (e) {
    return "0 MB";
  }
};
exports.loghandler = {
  noturl: {
    status: false,
    creator,
    result: "masukan parameter url",
  },
  notquery: {
    status: false,
    creator,
    result: "masukkan parameter query",
  },
  nottext: {
    status: false,
    creator,
    result: "masukan parameter text",
  },
  nottext2: {
    status: false,
    creator,
    result: "masukan parameter text2",
  },
  nottext3: {
    status: false,
    creator,
    result: "masukan parameter text3",
  },
  notusername: {
    status: false,
    creator,
    result: "masukan parameter username",
  },
  notnumber: {
    status: false,
    creator,
    result: "masukkan parameter number",
  },
  urlInvalid: {
    status: false,
    creator,
    result: "masukkan url dengan benar",
  },
  error: {
    status: false,
    creator,
    result: "Features Are Error Report Owner For Repair :)'",
  },
};
