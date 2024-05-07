const { Router } = require("express");
const {
  regexUrl,
  getBuffer,
  resError,
  loghandler,
} = require("../library/functions");
const { Ephoto } = require("./../scrapping/ephoto");
const apikeyAndLimit = require("../library/apikeyAndLimit");
const ephoto = new Ephoto();
router = Router();
const creator = "MrTomXxX";

router.get("/artistic", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-3d-artistic-water-photo-frames-online-681.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/chirstmas2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-texts-on-beautiful-christmas-ball-ornaments-501.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/dancingchirstmas", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/dancing-santa-claus-funny-gif-489.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/icetext", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/ice-text-effect-online-101.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/ml3", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/ml4", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/amazing-aov-wallpaper-online-full-hd-for-mobile-436.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/elegantlogovideo", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/rank", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/generate-banner-game-lol-with-rank-boders-439.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/arena", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/generate-banner-arena-of-valor-aov-with-name-440.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/ml2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-mobile-legends-wallpaper-full-hd-for-mobile-454.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/youtubebanner2", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-call-of-duty-warzone-youtube-banner-online-548.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/overwatch", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-avatar-overwatch-online-293.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/youtubebanner", async (req, res) => {
  const { text, text2, text3 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  if (!text3) return res.json(loghandler.nottext3);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-valorant-banner-youtube-online-588.html",
      [text, text2, text3]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/pubggirl", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/lovecard2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/text-heart-flashlight-188.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/lovecard3", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/beautiful-flower-valentine-s-day-greeting-cards-online-512.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/lovecard4", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(res, "https://en.ephoto360.com/love-card-187.html", url, [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/winggif", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-name-on-heart-with-wings-gifs-430.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/pubgcake", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-name-on-pubg-birthday-cake-images-522.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/romantic-anniversary-birthday-cake-with-name-edit-473.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-name-on-flower-birthday-cake-pics-472.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake3", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/heart-shaped-rose-birthday-cake-with-name-edit-469.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake4", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/romantic-flower-heart-birthday-cake-by-name-edit-466.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake5", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/amazing-flower-birthday-cake-with-name-generator-465.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake6", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-name-on-red-rose-birthday-cake-images-462.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake7", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/chocolate-birthday-cake-with-candle-with-name-generator-461.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake8", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-a-greeting-on-the-birthday-cake-229.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cake9", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(res, "https://en.ephoto360.com/birthday-cake-96.html", url, [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/womenday2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-card-8-march-happy-international-women-s-day-online-518.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/womenday2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-card-8-march-happy-international-women-s-day-online-518.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/womenday2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-card-8-march-happy-international-women-s-day-online-518.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/blood", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/writing-horror-text-online-266.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/blood2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/writing-horror-letters-on-metal-plates-265.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/blood3", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/write-blood-text-on-the-wall-264.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/halloween2", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/halloween-fire-text-online-83.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/birthdaycard", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-birthday-cards-by-3d-names-373.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/flaming", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/flame-lettering-effect-372.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cup", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(res, "https://en.ephoto360.com/heart-cup-194.html", url, [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/diary", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/diary-and-smartphone-photo-frame-571.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/wanted", async (req, res) => {
  const { url, text, text2 } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!url || !text2) return resError(res, "masukkan parameter url & text2");

  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(res, " https://en.ephoto360.com/one-piece-wanted-237.html", url, [
      text,
      text2,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/wanted2", async (req, res) => {
  const { url } = req.query;
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      " https://en.ephoto360.com/create-a-wanted-photo-frame-301.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/wanted3", async (req, res) => {
  const { url, text, text2 } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!url || !text2) return resError(res, "masukkan parameter url & text2");

  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      " https://en.ephoto360.com/create-a-wanted-poster-for-one-piece-live-action-724.html",
      url,
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/cyberpunk", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/cyberpunk-city-photo-frame-533.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/billboard", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-outdoor-billboard-photo-frame-702.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/fire", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/fire-animated-photo-effects-137.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/worldcup", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-avatars-for-world-cup-2022-766.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/rain", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/rain-glass-door-gifs-photo-frames-431.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/cat", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/collage-a-cat-with-super-cool-glasses-699.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/ring", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/ring-of-fire-photo-frame-370.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/collage", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/collage-photo-on-smartphone-frame-on-snow-background-663.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/sad", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-video-sad-mood-with-smartphone-622.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/cinemagraph", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/cinemagraph-of-vintage-television-537.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});
router.get("/diaryframe", async (req, res) => {
  const { url, text } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-diary-photo-frame-online-525.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/wood", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-3d-wood-text-effects-online-free-705.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/loveballon", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(res, "https://en.ephoto360.com/create-love-balloons-cards-334.html", [
      text,
      text2,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/loveballon2", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-letters-on-the-balloons-love-189.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/television", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-text-on-vintage-television-online-670.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/glasses", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/blackpink", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/freefire2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-free-fire-avatar-online-572.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/legend2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-league-of-legends-avatar-league-of-legends-banners-240.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/teamfight", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-avatar-teamfight-tactics-tft-by-name-online-550.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/overwatch2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-overwatch-wallpaper-full-hd-for-mobile-575.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/newrov", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-avatar-rov-new-286.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/newrov2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-new-rov-wallpaper-hd-by-name-for-mobile-330.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/king2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-cover-league-of-king-257.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/lolnew", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-avatar-lol-new-242.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/dota", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(res, "https://en.ephoto360.com/create-avatar-dota-241.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/mobilegame", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-avatar-3q-360-mobile-game-s-254.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/lovecard6", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(res, "https://en.ephoto360.com/love-card-187.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/flag", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/national-flag-text-effect-according-to-your-country-752.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/doubleexpouser", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-double-exposure-inspired-text-effect-online-free-468.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/dancetext", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(res, "https://en.ephoto360.com/dance-text-effects-312.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/pubgcolorful", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/colorful-pubg-logo-maker-online-613.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/pubgcover2", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-facebook-game-pubg-cover-photo-407.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/newaov", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-new-avatar-rov-by-name-327.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/legend5", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/galaxylol", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-beautiful-galaxy-cover-lol-344.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/legend6", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-the-league-of-legends-wallpaper-for-mobile-315.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/crossfire", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-avatar-style-crossfire-282.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/freefire3", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/neonbp", async (req, res) => {
  text = req.query.text;
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/juventus", async (req, res) => {
  const { text, number } = req.query;
  if (!number || !Number(number))
    return resError(res, "masukkan parameter no & parameter no berupa number");
  if (!text) return resError(res, "masukkan parameter text");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-juventus-shirt-effect-536.html",
      [text, number]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/coverpubg", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/greenbrush", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/eraser", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/dragonfire", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/dragon-fire-text-effect-111.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/incandescent", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/typography", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/dark-green-typography-online-359.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/letters", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-letters-on-the-leaves-248.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/cloth", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/text-on-cloth-effect-62.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/graffiti", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/text-graffiti-3d-208.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/metals", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/metal-star-text-online-109.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/blueneon", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/blue-neon-text-effect-117.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/typography2", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/make-typography-text-online-338.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/nightstars", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/stars-night-online-84.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/cloud", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/cloud-text-effect-139.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/caper", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/caper-cut-effect-184.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/horror", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/writing-horror-text-online-266.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/sunlight", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/sunlight-shadow-text-204.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/cake", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/birthday-cake-96.html", [text])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/pig", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/lovely-cute-3d-text-effect-with-pig-397.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/hallowen", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/halloween-fire-text-online-83.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/leafgraphy", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/typography-online-leaf-autumn-358.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/water", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-water-effect-text-online-295.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/writestatus", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-status-quotes-on-photo-online-free-455.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/scholes", async (req, res) => {
  const { text, number } = req.query;
  if (!text || !Number(number))
    return resError(
      res,
      "masukkan parameter text & number, parameter number berupa angka"
    );
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/paul-scholes-shirt-foot-ball-335.html",
      [text, number]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/heated", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/heated-steel-lettering-effect-65.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/floral", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/lovely-floral-ornamental-banner-online-603.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/shirt3", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-football-shirt-messi-barca-online-268.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/neonexpensive", async (req, res) => {
  const { text, text2, text3 } = req.query;
  if (!text || !text2 || !text3)
    return resError(res, "masukkan parameter text & text2 & text3");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-a-awesome-logo-sci-fi-effects-492.html",
      [text, text2, text3]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/shirt4", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/text-on-shirt-club-real-madrid-267.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/shirt5", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-photo-premier-league-cup-263.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/blackpubg", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/black-white-pubg-logo-for-esports-gaming-610.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/shirt6", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(res, "https://en.ephoto360.com/create-barca-shirt-effect-262.html", [
      text,
      text2,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/buoys", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/write-letters-on-life-buoys-484.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/quotestatus", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text || !text2) return resError(res, "masukkan parameter text & text2");
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-typography-status-quotes-images-online-for-free-452.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/neonblue", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-light-effects-green-neon-online-429.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/foggy", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/foggy-rainy-text-effect-75.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-online-dragon-ball-facebook-cover-photos-maker-443.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover2", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/name-cover-lol-create-cover-that-league-of-legends-league-of-legends-banners-218.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/tatto", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-tattoos-online-by-your-name-309.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover3", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-one-piece-facebook-cover-online-553.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover4", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-league-of-legends-cover-by-name-302.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover5", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-cover-cf-under-your-name-300.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover6", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-overwatch-cover-by-name-292.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover7", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-cover-facebook-style-league-of-legends-new-291.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover8", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-dota-2-cover-with-name-238.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover9", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-cs-go-cover-with-name-233.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover10", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-lol-pentakill-231.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover11", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(res, "https://en.ephoto360.com/crossfire-cover-222.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover12", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-cover-by-name-and-heroes-in-overwatch-221.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/facebookcover13", async (req, res) => {
  text = req.query.text;
  text2 = req.query.text2;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-an-impressive-anime-style-cover-317.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/crank", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(res, "https://en.ephoto360.com/animate-general-exam-crank-149.html", [
      text,
    ])
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/puppy", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-puppy-cute-animated-online-478.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("gif").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/pubgavatar", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-pubg-style-glitch-video-avatar-554.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/adventure", async (req, res) => {
  const { url, text, text2 } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/brush-travel-adventure-social-photo-frame-605.html",
      url,
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/vhs", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/vhs-glitch-photo-effect-online-editing-510.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/memories", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/pencil-photo-travel-memories-367.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/notebook", async (req, res) => {
  const { url, text, text2 } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/make-notebook-music-effect-346.html",
      url,
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/glazing", async (req, res) => {
  const { url, text } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!text) return res.json(loghandler.nottext);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-a-rain-glazing-frame-effect-284.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/flower", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/fall-flower-photo-effects-130.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/heart", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(res, "https://en.ephoto360.com/fire-heart-123.html", url)
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/smoke", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(res, "https://en.ephoto360.com/smoke-photo-effects-119.html", url)
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/handlefire", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/fire-photo-handle-effect-396.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/spectrum", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/spectrum-audio-photo-frame-online-570.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/painting", async (req, res) => {
  url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-painting-effect-on-stone-background-online-722.html",
      url
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/tiger", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/wposter", async (req, res) => {
  const { url, text, text2 } = req.query;
  if (!url) return res.json(loghandler.noturl);
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await ephoto
    .image(
      res,
      "https://en.ephoto360.com/create-a-wanted-poster-for-one-piece-live-action-724.html",
      url,
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/american", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/pencil", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-pencil-sketch-logo-online-719.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/arrow", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/arrow-tattoo-effect-with-signature-712.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/arrow2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-multicolored-signature-attachment-arrow-effect-714.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/anonymous", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/aov", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-beautiful-shimmering-aov-wallpapers-full-hd-for-mobile-643.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/warface", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-cover-of-warface-online-243.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/ml", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-mobile-legends-wallpaper-full-hd-for-mobile-454.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/window", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/gamergirl", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/teamlogo", async (req, res) => {
  const text = req.query.text;
  const text2 = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-an-online-team-logo-in-black-and-white-style-689.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/beach", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-3d-text-effect-on-the-beach-online-688.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/aov2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-beautiful-shimmering-aov-wallpapers-full-hd-for-mobile-643.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/pubg3", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/glitter", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-glitter-text-effect-maker-online-656.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/neonstyle", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/multicolor", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/gaminglogo", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-logo-team-logo-gaming-assassin-style-574.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/fpsgame", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/vibrant", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/vibrant-fireworks-text-effect-535.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/blueneon2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-blue-neon-logo-online-507.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/steelmetal", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/metal-mascots-logo-maker-486.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/pubg2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-pubg-logo-maker-online-609.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/circlemascot", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-circle-mascot-team-logo-483.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/luxuarylogo", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-luxury-logo-maker-create-logo-online-458.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/printname", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/print-name-on-hollywood-walk-of-fame-star-451.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/minimal", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-minimal-logo-maker-online-445.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/galaxy", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-mascot-logo-astronaut-space-galaxy-online-free-437.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/team2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/make-team-logo-online-free-432.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/sheild", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-mascot-shield-logo-online-for-free-758.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/angel2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-colorful-angel-wing-avatars-731.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/queen", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-personalized-queen-card-avatar-730.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/circlefootball", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-circle-football-logo-online-592.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/gun", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-gun-minimal-logo-gaming-online-590.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/gaminglogo2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-gaming-mascot-logo-free-560.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/zodiac", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-zodiac-online-logo-maker-491.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/metal5", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-logo-3d-metal-online-374.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/steel2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-black-and-white-mascot-logo-371.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/mascotavatar", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-logo-avatar-mascot-style-364.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/mascotavatar2", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-logo-templates-according-to-online-icons-361.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/galaxy6", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/utility-to-create-online-class-logo-in-style-galaxy-313.html",
      [text, text2]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/goldavatar", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-avatar-gold-online-303.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/metalavatar2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/create-a-metal-avatar-by-your-name-299.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});

router.get("/angel3", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/the-effect-of-galaxy-angel-wings-289.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch(() => res.json(loghandler.error));
});
router.get("/pubgavatar2", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/halloween6", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/funny-halloween-video-greeting-card-online-601.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/intro", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/lovecard", async (req, res) => {
  const { url, text } = req.query;
  if (!url || !text) return resError(res, "masukkan parameter url & text");
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  ephoto
    .image(
      res,
      " https://en.ephoto360.com/online-love-greeting-card-maker-513.html",
      url,
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("png").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((err) => {
      console.log(err);
      res.json(loghandler.error);
    });
});

router.get("/loveavatar", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/womenday", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-a-greeting-video-card-for-international-women-s-day-on-march-8-784.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/loveavatar", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/chirstmasvideo", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-beautiful-and-impressive-christmas-video-cards-for-friends-and-family-726.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/loveavatar", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/newyearvideo", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-new-year-countdown-video-cards-728.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/newyearvideo2", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/happy-new-year-video-card-with-fireworks-2021-634.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/newyearvideo3", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/create-video-greeting-cards-for-the-new-year-2021-online-630.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/merrychirstmasvideo", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .text(
      res,
      "https://en.ephoto360.com/christmas-and-new-year-greeting-card-video-online-626.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

router.get("/intro2", async (req, res) => {
  text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await ephoto
    .radio_text(
      res,
      "https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html",
      [text]
    )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => {
          res.type("mp4").send(buff);
        })
        .catch(() => res.json(loghandler.error));
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

module.exports = router;
