const { Router } = require("express");
const { fromBuffer } = require("file-type");
const { regexUrl, getBuffer, loghandler } = require("../library/functions");
const { Photooxy } = require("./../scrapping/photooxy");
const photooxy = new Photooxy();
const apikeyAndLimit = require("../library/apikeyAndLimit");
router = Router();

router.get("/pubg", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  photooxy
    .text(
      "https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html",
      [text, text2]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/slidetext", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .radio(
      "https://photooxy.com/other-design/make-a-video-that-spells-your-name-237.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("mp4").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/gravity", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text("https://photooxy.com/banner-cover/graffiti-text-cover-222.html", [
      text,
    ])
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/rainbow", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/oceansea", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});

router.get("/romantic", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});

router.get("/shadow", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/smoke", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/burnpaper", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/naruto", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/lovemessage", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/grass", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/glitch", async (req, res) => {
  const text = req.query.text;
  const text2 = req.query.text2;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
      [text, text2]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/doubleheart", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/coffecup", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/lovetext", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/love-text-effect-372.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/butterfly", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/coffee", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/quotewood", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});
router.get("/flaming", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  photooxy
    .text(
      "https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html",
      [text]
    )
    .then(async (anu) => {
      const buffer = await getBuffer(anu);
      res.type("png").send(buffer);
    })
    .catch((error) => {
      res.json(loghandler.error);
    });
});

//images URLs
router.get("/exposure", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/make-a-trendy-double-exposure-with-forest-194.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/flame", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/other-design/flame-up-your-photo-on-a-paper-399.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/frame", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/other-design/loving-memory-picture-frame-397.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/memory", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image("https://photooxy.com/art-effects/memory-photo-frame-393.html", url)
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/nature", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/photo-frames/photo-frame-in-nature-379.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/ripped", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image("https://photooxy.com/christmas/shimmering-note-paper-267.html", url)
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/tearing", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/photo-frames/paper-tearing-effect-311.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/iphone", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/put-your-picture-on-the-iphone-wallpapers-216.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/anaglyph", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/create-3d-anaglyph-photo-effect-203.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/mirrors", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/broken-mirrors-effect-299.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/shattered", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image("https://photooxy.com/art-effects/broke-a-card-298.html", url)
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/burning", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/burning-effect/photo-burns-on-hands-281.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/place", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/place-photo-on-note-cover-225.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/toilet", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json(loghandler.noturl);
  if (!regexUrl(url)) return res.json(loghandler.urlInvalid);
  await photooxy
    .image(
      "https://photooxy.com/art-effects/put-your-photo-down-the-toilet-224.html",
      url
    )
    .then(async (response) => {
      await getBuffer(response)
        .then((buffer) => {
          res.type("png").send(buffer);
        })
        .catch((er) => {
          res.json(loghandler.error);
          console.log(er);
        });
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});

module.exports = router;
