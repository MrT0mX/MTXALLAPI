const cheerio = require("cheerio");
const { resError } = require("../library/functions");
const { default: axios, isAxiosError } = require("axios");

const isLink = (url) =>
  url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi
    )
  ) && url.includes("nekopoi.care");

class Nekopoi {
  constructor() {
    this.baseURL = "https://nekopoi.care/";
    this.cookie =
      "__cf_bm=c3a3z0cTHCsxap_ks1FD9XX7D2zBTybrQl7GaWQ.eJo-1640194143-0-ARy1I2sbY7e8ToZtnf8rUhRYIYYpIzI0Z0oiLuwmVhcPM2jS0sPP1kigMP9tvyQnyfX4Hjact05eX/5WNuDHCFTKxX0ThS7uBSmyb9YxFY8YeThNnm/HZZJrM8nUT/F+YQ==";
  }
  Latest() {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "GET",
          url: this.baseURL,
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios Error";
          const $ = cheerio.load(data);
          const img = [];
          const title = [];
          const link = [];
          $("div.eropost").each((i, e) => {
            $(e)
              .find("h2")
              .each((i, e) => {
                title.push($(e).find("a").text().trim());
                link.push($(e).find("a").attr("href"));
              });
            img.push($(e).find("img").attr("src"));
          });
          const format = [];
          for (let i = 0; i < title.length; i++) {
            const obj = {
              thumbnail: img[i],
              title: title[i],
              url: link[i],
            };
            format.push(obj);
          }
          resolve(format);
        })
        .catch(reject);
    });
  }
  /**
   * Get result from Nekopoi.
   * @param {String} query
   */
  Search(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "GET",
          url: this.baseURL + "?s=" + query + "&post_type=anime",
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios Error";
          const $ = cheerio.load(data);
          let result = [];
          $("div.postsbody > div.result")
            .find("div.top")
            .each(function (a, b) {
              result.push({
                title: $(this).find("h2").text(),
                thumbnail: $(this).find("div.limitnjg > img").attr("src"),
                url: $(this).find("h2 > a").attr("href"),
              });
            });
          resolve(result);
        })
        .catch(reject);
    });
  }
  /**
   * Get hentai metadata.
   * @param {String} link
   */
  Get(url, response) {
    return new Promise(async (resolve, reject) => {
      if (!isLink(url))
        return resError(response, "invalid url, make sure the url is correct");
      await axios
        .request({
          method: "GET",
          url: encodeURI(url),
        })
        .then(({ data }) => {
          if (!data || data.length < 1) throw data;
          const $ = cheerio.load(data);
          const title = $("div.contentpost > div.thm > img").attr("alt");
          const thumbnail = $("div.contentpost > div.thm > img").attr("src");
          let meta = $("div.contentpost > div.konten")
            .text()
            .split(" : ")
            .join("\n")
            .split("\n");
          const metadata = [
            { movieID: meta[3] },
            { [meta[5].toLowerCase()]: meta[6] },
            { [meta[7].toLowerCase()]: meta[8] },
            { [meta[9].toLowerCase()]: meta[10] },
          ];
          let linkDownload = [];
          $("div.boxdownload > div.liner:nth-child(1) > div.listlink")
            .find("a")
            .each(function (a, b) {
              linkDownload.push({
                [$(this).text().toLowerCase().split(" ")[0]]:
                  $(this).attr("href"),
              });
            });
          resolve({
            title,
            thumbnail,
            metadata,
            linkDownload,
          });
        })
        .catch(reject);
    });
  }
}

module.exports = { Nekopoi };
