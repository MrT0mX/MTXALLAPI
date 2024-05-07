const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const fakeUa = require("../controller/fakeUa");

class Anime {
  constructor() {}
  kusonime(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://kusonime.com/page/${
            Math.floor(Math.random() * 2) + 1
          }/?s=${encodeURIComponent(query)}&post_type=post`,
          { headers: { "User-Agent": fakeUa() } }
        )
        .then(async (response) => {
          if (isAxiosError()) throw "axios error";
          let result = new Array();
          const $ = cheerio.load(response.data);
          $("div.rapi > div > ul > div > div").each(function (a, b) {
            result.push({
              title: $(this).find("div > a").attr("title"),
              genre: $(this)
                .find("div > div.content > p:nth-child(4) > a:nth-child(2)")
                .text(),
              thumbnail: $(this).find("div > a > div > img").attr("src"),
              url: $(this).find("div > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }
  mangaSearch(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://www.meganebuk.net/?s=${encodeURIComponent(query)}`, {
          headers: { "User-Agent": fakeUa() },
        })
        .then(async (response) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(response.data);
          const url = $("article.small-archive-post > a").attr("href");
          await axios
            .get(url, { headers: { "User-Agent": fakeUa() } })
            .then(async ({ data }) => {
              const _ = cheerio.load(data);
              let download = new Array();
              _("div.entry-content > table:nth-child(8) > tbody > tr").each(
                function (a, b) {
                  download.push({
                    data: _(this).find("td:nth-child(2)").text() || undefined,
                    type:
                      _(this).find("td:nth-child(3) > a:nth-child(1)").text() ||
                      undefined,
                    url: _(this).find("td:nth-child(3) > a").attr("href"),
                    type2: _(this)
                      .find("td:nth-child(3) > a:nth-child(2)")
                      .text(),
                    url2: _(this)
                      .find("td:nth-child(3) > a:nth-child(2)")
                      .attr("href"),
                  });
                }
              );
              resolve({
                title: _("h1.entry-title").text(),
                name: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(2) > td:nth-child(2)"
                ).text(),
                author: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(2)"
                ).text(),
                genre: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(5) > td:nth-child(2)"
                ).text(),
                rating: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(6) > td:nth-child(2)"
                ).text(),
                relased: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(7) > td:nth-child(2)"
                ).text(),
                status: _(
                  "div.entry-content > table:nth-child(5) > tbody > tr:nth-child(8) > td:nth-child(2)"
                ).text(),
                published: _("time.entry-date").text(),
                category: _("span.meta-category").text(),
                description:
                  _("div.entry-content > div:nth-child(2)")
                    .text()
                    .split(/– /)[1] +
                  " " +
                  _("div.entry-content > div:nth-child(4)").text(),
                download: download.filter((a) => a.type !== undefined),
              });
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = { Anime };
