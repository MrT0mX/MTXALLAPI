const axios = require("axios");
const cheerio = require("cheerio");
const fakeUa = require("../controller/fakeUa");
const qs = require("qs");

async function photofunia_text(url, text) {
  return new Promise(async (resolve, reject) => {
    await axios({
      method: "POST",
      url,
      data: qs.stringify({ text: text }),
      headers: {
        "User-Agent": fakeUa(),
      },
    })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        let result = $("div.image-container > div.image > img").attr("src");
        resolve(result);
      })
      .catch(reject);
  });
}

module.exports = { photofunia_text };
