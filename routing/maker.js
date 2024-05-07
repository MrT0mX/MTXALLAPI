const { Router } = require("express");
const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const { fromBuffer } = require("file-type");
const ameClient = require("./../scrapping/amethyste");
const ameApi = new ameClient(
  "015e9ee6d55d7ec9b6643c67d0b11487da81cca6d32a221fb4559739705c0d7b50caddfc508fb6fc4bd60f5ece4323b39bd4efeb414c545e192c1facd0fdfb91"
);
const {
  regexUrl,
  getBuffer,
  getJson,
  resSukses,
  resError,
  loghandler,
} = require("../library/functions");
const { Sticker } = require("./../scrapping/semoji");
const { Tools } = require("./../scrapping/tools");
const sticker = new Sticker();
const tools = new Tools();
const apikeyAndLimit = require("../library/apikeyAndLimit");
const creator = "MrTomXxX";
router = Router();

router.get("/styletext", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  let respon = await axios.get(
    `http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(text)}`
  );
  if (isAxiosError()) return res.json(loghandler.error);
  $ = cheerio.load(respon.data);
  obj = $("table").text();
  resSukses(res, obj);
});
router.get("/quotes", async (req, res) => {
  const { text, wm, background } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!wm) return resError(res, "masukkan parameter wm");
  if (!background) return resError(res, "masukkan parameter background");
  if (!regexUrl(background)) return res.json(loghandler.urlInvalid);
  await getJson(
    `https://canvacord-production.up.railway.app/api/quotes?text=${encodeURIComponent(
      text
    )}&wm=${encodeURIComponent(wm)}&url=${background}`
  )
    .then(async (response) => {
      if (!response.result) return res.json(loghandler.error);
      const buffer = Buffer.from(response.result);
      res.type("png").send(buffer);
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/rmbg", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(url)
    .then(async (buffer) => {
      if (!Buffer.isBuffer(buffer)) return resError(res, "not a buffer type");
      const fileType = await fromBuffer(buffer);
      if (fileType.ext !== "jpg")
        return resError(res, "file type can't " + fileType.ext);
      await tools
        .removebg(buffer)
        .then(async (buffer) => {
          await getBuffer(buffer)
            .then((response) => res.type("png").send(response))
            .catch((e) => {
              console.error(e);
              res.json(loghandler.error);
            });
        })
        .catch((e) => {
          console.error(e);
          res.json(loghandler.error);
        });
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/caution", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(`https://api.popcat.xyz/caution?text=${text}`)
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/communism", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(`https://api.popcat.xyz/communism?image=${url}`)
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/drake", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await getBuffer(`https://api.popcat.xyz/drake?text1=${text}&text2=${text2}`)
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/biden", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(`https://api.popcat.xyz/biden?text=${text}`)
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/facts", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(`https://api.popcat.xyz/facts?text=${text}`)
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/badut", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  buffer = await getBuffer(
    `https://canvacord-production.up.railway.app/api/badut?url=${encodeURIComponent(
      url
    )}`
  );
  res.type("png");
  res.send(buffer);
});
router.get("/badut2", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  buffer = await getBuffer(
    `https://canvacord-production.up.railway.app/api/badut2?url=${encodeURIComponent(
      url
    )}`
  );
  res.type("png");
  res.send(buffer);
});
router.get("/badut3", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  buffer = await getBuffer(
    `https://canvacord-production.up.railway.app/api/badut3?url=${encodeURIComponent(
      url
    )}`
  );
  res.type("png").send(buffer);
});
router.get("/twitter", async (req, res) => {
  const { url, username, text } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!username) return res.json(loghandler.notusername);
  if (!text) return res.json(loghandler.nottext);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/twitter?url=${encodeURIComponent(
      url
    )}&username=${username}&text=${text}`
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/stickbug", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  try {
    let { data } = await axios.get(
      `https://nekobot.xyz/api/imagegen?url=${url}&type=stickbug`
    );
    if (isAxiosError()) return res.json(loghandler.error);
    let stickbug = await getBuffer(data.message);
    res.type("mp4").send(stickbug);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/tweet", async (req, res) => {
  const query = req.query.username;
  if (!query) return res.json(loghandler.notusername);
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  try {
    buffer = await axios.get(
      `https://nekobot.xyz/api/imagegen?text=${text}&username=${query}&type=tweet`
    );
    if (isAxiosError()) return res.json(loghandler.error);
    let tweet = await getBuffer(buffer.data.message);
    res.type("png").send(tweet);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/animeface", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  try {
    let { data } = await axios.get(
      `https://nekobot.xyz/api/imagegen?image=${url}&type=animeface`
    );
    if (isAxiosError()) return res.json(loghandler.error);
    animeface = await getBuffer(data.message);
    res.type("png");
    res.send(animeface);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/iphonex", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  try {
    let { data } = await axios.get(
      `https://nekobot.xyz/api/imagegen?type=iphonex&url=${url}`
    );
    if (isAxiosError()) return res.json(loghandler.error);
    let iphonex = await getBuffer(data.message);
    res.type("png");
    res.send(iphonex);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/kannagen", async (req, res) => {
  const query = req.query.text;
  if (!query) return res.json(loghandler.nottext);
  try {
    let kannagen = await getBuffer(
      `https://nekobot.xyz/api/imagegen?raw=1&type=kannagen&text=${query}`
    );
    res.type("png");
    res.send(kannagen);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/captcha", async (req, res) => {
  const query = req.query.text;
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!query) return res.json(loghandler.nottext);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  try {
    let captcha = await getBuffer(
      `https://nekobot.xyz/api/imagegen?username=${query}&url=${url}&raw=1&type=captcha`
    );
    res.type("png");
    res.send(captcha);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/trumptweet", async (req, res) => {
  const query = req.query.text;
  if (!query) return res.json(loghandler.nottext);
  try {
    let trumptweet = await getBuffer(
      `https://canvacord-production.up.railway.app/api/trumptweet?text=${query}`
    );
    res.type("png");
    res.send(trumptweet);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/toonify", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  try {
    let toonify = await getBuffer(
      `https://canvacord-production.up.railway.app/api/toonify?url=${url}`
    );
    res.type("png");
    res.send(toonify);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/tahta", async (req, res) => {
  const query = req.query.text;
  if (!query) return res.json(loghandler.nottext);
  try {
    let Tahta = await getBuffer(
      `https://canvacord-production.up.railway.app/api/tahta?text=${query}`
    );
    res.type("png");
    res.send(Tahta);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/costumtahta", async (req, res) => {
  const query1 = req.query.text1;
  const query2 = req.query.text2;
  const query3 = req.query.text3;
  if (!query1) return res.json(loghandler.nottext);
  if (!query2) return res.json(loghandler.nottext2);
  if (!query3) return res.json(loghandler.nottext3);
  try {
    let Tahta = await getBuffer(
      `https://canvacord-production.up.railway.app/api/costumtahta?text1=${query3}&text2=${query2}&text3=${query1}`
    );
    res.type("png");
    res.send(Tahta);
  } catch (er) {
    res.json(loghandler.error);
    console.log(er);
  }
});
router.get("/instagram", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("instagram", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      console.error(err);
      res.json(loghandler.error);
    });
});
router.get("/tobecontinue", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("tobecontinued", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/scary", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("scary", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/glitch", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("glitch", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/rejected", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("rejected", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/ps4", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("ps4", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/brazzers", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("brazzers", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/distort", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("distort", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/moustache", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("moustache", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/frame", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("frame", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/missionpassed", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("missionpassed", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/emboss", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("emboss", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/spongebob", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("fire", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/facebook", async (req, res) => {
  const url = req.query.url;
  const teks = req.query.text;
  if (!teks) return res.json(loghandler.nottext);
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("facebook", {
      url: url,
      text: teks,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/discordhouse", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("discordhouse", {
      url: url,
      house: "balance",
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/karenhave", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("lookwhatkarenhave", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/thanos", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("thanos", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/approved", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("approved", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/burn", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("burn", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/challenger", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("challenger", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/crush", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("crush", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/dictator", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("dictator", {
      url: url,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/vs", async (req, res) => {
  const url = req.query.url;
  const url2 = req.query.url2;
  if (!url2) return resError(res, "masukkan parameter url2");
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  if (!regexUrl(url2)) return res.json(loghandler.urlInvalid);
  ameApi
    .generate("vs", {
      type: 1,
      avatar: url,
      url: url2,
    })
    .then(async (image) => {
      res.type("png");
      res.send(image);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/emojipedia", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(loghandler.notquery);
  sticker
    .toSticker(query)
    .then((data) => {
      res.json({
        status: true,
        creator: creator,
        result: data,
      });
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/triggered", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/triggered?url=" +
      req.query.url
  )
    .then((buffer) => {
      res.type("gif");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/rip", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/rip?url=" + req.query.url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/greyscale", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/greyscale?url=" +
      req.query.url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/jail", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/jail?url=" + req.query.url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/darkness", async (req, res) => {
  if (!req.query.ammount) return resError(res, "masukkan parameter ammount");
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/darkness?url=" +
      req.query.url +
      "&ammount=" +
      req.query.ammount
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/delete", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/delete?url=" +
      req.query.url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/invert", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/invert?url=" +
      req.query.url
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/sepia", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/sepia?url=" + req.query.url
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/blur", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/blur?url=" + req.query.url
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/circle", async (req, res) => {
  if (!req.query.url) return res.json(loghandler.noturl);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/circle?url=" +
      req.query.url
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/fuse", async (req, res) => {
  const { url, url2 } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!url2) return resError(res, "masukkan parameter url2");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  if (!regexUrl(url2)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/fuse?url=" +
      url +
      "&url2=" +
      url2
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/phub", async (req, res) => {
  const { url, username, text } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!username) return res.json(loghandler.notusername);
  if (!text) return res.json(loghandler.nottext);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/phub?url=" +
      url +
      "&username=" +
      username +
      "&text=" +
      text
  )
    .then(async (buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/ytcomment", async (req, res) => {
  const { url, username, text } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!username) return res.json(loghandler.notusername);
  if (!text) return res.json(loghandler.nottext);
  if (!regexUrl(req.query.url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/ytcomment?url=${url}&username=${username}&text=${text}`
  )
    .then(async (buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/resize", async (req, res) => {
  const { width, height, url } = req.query;
  if (!height || !width)
    return resError(res, "masukkan parameter width & height");
  if (!Number(width) || !Number(height))
    return resError(res, "parameter height & width berupa angka");
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/resize?url=${encodeURIComponent(
      req.query.url
    )}&height=${height}&width=${width}`
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/wanted", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/wanted?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/wasted", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/wasted?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/affect", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/affect?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/gay", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/gay?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/joke", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/joke?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/opinion", async (req, res) => {
  const { text, url } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/opinion?url=" +
      url +
      "&text=" +
      text
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/trash", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/trash?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/facepalm", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/facepalm?url=" + url
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/beautiful", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    "https://canvacord-production.up.railway.app/api/beautiful?url=" + url
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});

router.get("/meme", async (req, res) => {
  const { text, text2, url } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  const { data } = await axios.request({
    url: "https://api.memegen.link/images/custom",
    method: "POST",
    data: {
      background: url,
      style: "default",
      text_lines: [text, text2],
      extension: "png",
      redirect: false,
    },
  });
  if (isAxiosError()) return res.json(loghandler.error);
  await getBuffer(data.url)
    .then(async (buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});

router.get("/carbontext", async (req, res) => {
  if (!req.query.text) return res.json(loghandler.nottext);
  await getBuffer(
    `https://thiccyscarbonapi.herokuapp.com/?code=${req.query.text}&language=Nodejs&theme=dark&exportSize=3x`
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/ssmap", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.json(loghandler.notquery);
  await getBuffer(
    `https://cdn.statically.io/screenshot/full=true/www.google.com/maps/place/${query}`
  )
    .then((result) => {
      res.type("png").send(result);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/ssweb", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await getBuffer(
    `https://api.apiflash.com/v1/urltoimage?access_key=06ce7f1d5e3d41edaee385b749ef0e33&url=${url}`
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/nulis", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getJson(
    "https://st4rz.herokuapp.com/api/nulis?text=" + encodeURIComponent(text)
  )
    .then(async (respon) => {
      getSplit = respon.result.split(",")[1];
      buffer = new Buffer.from(getSplit, "base64");
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/nulis2", async (req, res) => {
  const { text, nama, kelas } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!nama) return resError(res, "masukkan parameter nama");
  if (!kelas) return resError(res, "masukkan parameter kelas");
  if (!Number(kelas))
    return resError(res, "parameter kelas harus berupa angka");
  if (nama.length > 25)
    return resError(res, "text parameter nama terlalu panjang max 25 huruf");
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/nulis?text=${text}&kelas=${kelas}&nama=${nama}`
  )
    .then((buffer) => {
      res.type("jpg");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});

router.get("/sertitolol", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(`https://tolol.ibnux.com/img.php?nama=${text}`)
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/tts", async (req, res) => {
  const { language, text } = req.query;
  if (!language) return resError(res, "masukkan parameter language");
  if (!text) return res.json(loghandler.nottext);
  tools
    .text2speach(text, language)
    .then(async (result) => {
      await getBuffer(result)
        .then((buffer) => {
          res.type("mp3").send(buffer);
        })
        .catch((e) => {
          console.error(e);
          res.json(loghandler.error);
        });
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/ttp", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(
    `https://huratera.sirv.com/PicsArt_08-01-10.00.42.png?profile=Example-Text&text.0.text=${encodeURIComponent(
      text
    )}&text.0.color=ffffff&text.0.background.color=0000ff&text.0.font.family=Changa%20One&&text.0.outline.color=0000`
  )
    .then(async (buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/ttp2", async (req, res) => {
  const { text, color } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!color) return resError(res, "masukkan parameter color");
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/ttp?text=${text}&color=${color}`
  )
    .then(async (buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/ttp3", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(
    `https://huratera.sirv.com/PicsArt_08-01-10.00.42.png?profile=Example-Text&text.0.text=${encodeURIComponent(
      text
    )}&text.0.opacity=93&text.0.outline.color=fff40a&text.0.outline.width=4&text.0.color=000000&text.0.font.family=Permanent%20Marker&text.0.background.color=ffffff`
  )
    .then((buffer) => {
      res.type("png").send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/attp", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await getBuffer(`https://api.xteam.xyz/attp?file&text=${text}`)
    .then(async (buffer) => {
      res.type("gif");
      res.send(buffer);
    })
    .catch((err) => {
      res.json(loghandler.error);
    });
});
router.get("/spotifycard", async (req, res) => {
  const { author, album, title, img, start, end } = req.query;
  if (!author || !album || !title || !img || !start || !end)
    return resError(
      res,
      "masukkan parameter 'author, album, title, img, start, end'"
    );
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/spotify?author=${author}&album=${album}&start=${start}&end=${end}&img=${img}&title=${title}`
  )
    .then((buffer) => {
      res.type("png");
      res.send(buffer);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/welcome2", async (req, res) => {
  const { name, ucapan, memcount, gcname, pp, ppgc } = req.query;
  if (!name) return resError(res, "masukkan parameter name");
  if (!ucapan) return resError(res, "masukkan parameter ucapan");
  if (!memcount) return resError(res, "masukkan parameter memcount");
  if (!gcname) return resError(res, "masukkan parameter gcname");
  if (!pp) return resError(res, "masukkan parameter pp");
  if (!ppgc) return resError(res, "masukkan parameter ppgc");
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/welcome2?name=${name}&ucapan=${ucapan}&memcount=${memcount}&gcname=${gcname}&pp=${pp}&ppgc=${ppgc}`
  )
    .then((data) => {
      res.type("png");
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/goodbye2", async (req, res) => {
  const { name, ucapan, memcount, gcname, pp, ppgc } = req.query;
  if (!name) return resError(res, "masukkan parameter name");
  if (!ucapan) return resError(res, "masukkan parameter ucapan");
  if (!memcount) return resError(res, "masukkan parameter memcount");
  if (!gcname) return resError(res, "masukkan parameter gcname");
  if (!pp) return resError(res, "masukkan parameter pp");
  if (!ppgc) return resError(res, "masukkan parameter ppgc");
  await getBuffer(
    `https://canvacord-production.up.railway.app/api/goodbye2?name=${name}&ucapan=${ucapan}&memcount=${memcount}&gcname=${gcname}&pp=${pp}&ppgc=${ppgc}`
  )
    .then((data) => {
      res.type("png");
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});
router.get("/welcome", async (req, res) => {
  const { name, ucapan, memcount, gcname, pp, bg } = req.query;
  if (!name) return resError(res, "masukkan parameter name");
  if (!ucapan) return resError(res, "masukkan parameter ucapan");
  if (!memcount) return resError(res, "masukkan parameter memcount");
  if (!gcname) return resError(res, "masukkan parameter gcname");
  if (!pp) return resError(res, "masukkan parameter pp");
  if (!bg) return resError(res, "masukkan parameter bg");
  await getBuffer(
    `https://hadi-api.herokuapp.com/api/card/welcome?nama=${name}&descriminator=${ucapan}&memcount=${memcount}&gcname=${gcname}&pp=${pp}&bg=${bg}`
  )
    .then((response) => {
      res.type("png").send(response);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});

router.get("/goodbye", async (req, res) => {
  const { name, ucapan, memcount, gcname, pp, bg } = req.query;
  if (!name) return resError(res, "masukkan parameter name");
  if (!ucapan) return resError(res, "masukkan parameter ucapan");
  if (!memcount) return resError(res, "masukkan parameter memcount");
  if (!gcname) return resError(res, "masukkan parameter gcname");
  if (!pp) return resError(res, "masukkan parameter pp");
  if (!bg) return resError(res, "masukkan parameter bg");
  await getBuffer(
    `https://hadi-api.herokuapp.com/api/card/welcome?nama=${name}&descriminator=${ucapan}&memcount=${memcount}&gcname=${gcname}&pp=${pp}&bg=${bg}`
  )
    .then((response) => {
      res.type("png").send(response);
    })
    .catch((e) => {
      console.error(e);
      res.json(loghandler.error);
    });
});

module.exports = router;
