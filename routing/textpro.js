const express = require("express");
const { getBuffer } = require("../library/functions");
const { Textprome } = require("./../scrapping/textprome");
const { loghandler } = require("../library/functions");

const textpro = new Textprome();
const apikeyAndLimit = require("../library/apikeyAndLimit");
router = express.Router();

router.get("/thunder2", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/online-thunder-text-effect-generator-1031.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/layered", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text2) return res.json(loghandler.nottext2);
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-layered-text-effects-online-free-1032.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/paper", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/pornhub", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  textpro
    .text(
      "https://textpro.me/pornhub-style-logo-online-generator-free-977.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/harrypotter", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-harry-potter-text-effect-online-1025.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/embossed", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-embossed-text-effect-on-cracked-surface-1024.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/broken", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/broken-glass-text-effect-free-online-1023.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/glossy", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/create-a-3d-glossy-metal-text-effect-1019.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/bear", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/devil", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/christmas", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/blackpink", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/dropwater", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/dropwater-text-effect-872.html", [text])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/carbon", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/carbon-text-effect-833.html", [text])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/imglitch", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/aglitch", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  textpro
    .text(
      "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/gradient", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/glue", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/neon", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/neon-text-effect-online-963.html", [text])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/blood", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/blood-text-on-the-frosted-glass-941.html", [text])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/firework", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/firework-sparkle-text-effect-930.html", [text])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/magma", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/stone", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/light", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/berry", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/create-berry-text-effect-online-free-1033.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/transformer", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/greenhorror", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-green-horror-style-text-effect-online-1036.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/videogame", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((er) => {
      res.json(loghandler.error);
      console.log(er);
    });
});
router.get("/fiction", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-science-fiction-text-effect-online-free-1038.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/captainamerica", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  textpro
    .text(
      "https://textpro.me/create-a-captain-america-text-effect-free-online-1039.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/metalic", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/creat-glossy-metalic-text-effect-free-online-1040.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/metallic", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-a-metallic-text-effect-free-online-1041.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/discovery", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-space-text-effects-online-free-1042.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/circuit", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/sketch", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [
      text,
    ])
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/choror", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  textpro
    .text(
      "https://textpro.me/create-a-cinematic-horror-text-effect-1045.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/spooky", async (req, res) => {
  const { text, text2 } = req.query;
  if (!text) return res.json(loghandler.nottext);
  if (!text2) return res.json(loghandler.nottext2);
  textpro
    .text(
      "https://textpro.me/create-a-spooky-halloween-text-effect-online-1046.html",
      [text, text2]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});
router.get("/skeleton", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  textpro
    .text(
      "https://textpro.me/create-halloween-skeleton-text-effect-online-1047.html",
      [text]
    )
    .then(async (result) => {
      const response = await getBuffer(result);
      res.type("png");
      res.send(response);
    })
    .catch((err) => {
      res.json(loghandler.error);
      console.log(err);
    });
});

module.exports = router;
