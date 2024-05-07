const routes = require("express");
const router = routes.Router();
const { photofunia_text } = require("./../scrapping/photofunia");
const { loghandler } = require("../library/functions");
const apikeyAndLimit = require("../library/apikeyAndLimit");

router.get("/snow", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await photofunia_text(
    "https://m.photofunia.com/categories/all_effects/snow-sign?server=1",
    text
  )
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => res.type("png").send(buff))
        .catch(() => res.json(loghandler.error));
    })
    .catch((e) => res.send(e));
});
router.get("/lock", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.json(loghandler.nottext);
  await photofunia_text("https://m.photofunia.com/effects/love-lock", text)
    .then(async (result) => {
      await getBuffer(result)
        .then((buff) => res.type("png").send(buff))
        .catch(() => res.json(loghandler.error));
    })
    .catch((e) => res.send(e));
});

module.exports = router;
