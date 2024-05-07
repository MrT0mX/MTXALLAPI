const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");

class LK21 {
  constructor() {}
  Search(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://149.56.198.206/?s=${encodeURIComponent(
            query
          )}#gsc.tab=0&gsc.q=${encodeURIComponent(query)}&gsc.page=1`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.grid-archive > div#grid-wrapper > div.page-1 > article").each(
            function (a, b) {
              let script = $(this).find("script").get();
              let parse;
              for (let anu of script) {
                parse = JSON.parse(anu.children[0].data);
              }
              result.push({
                title: parse.name,
                genre: parse.genre[0],
                dateCreated: parse.dateCreated,
                director: parse.director[0].name,
                duration: parse.duration.split("PT")[1],
                rating: parse.aggregateRating.ratingValue,
                review: parse.aggregateRating.reviewCount,
                bestRating: parse.aggregateRating.bestRating,
                type: parse.hasPart.description,
                thumbnail: parse.image,
                url: parse.url,
              });
            }
          );
          resolve(result);
        })
        .catch(reject);
    });
  }

  Latest() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://149.56.198.206/latest/page/${
            Math.floor(Math.random() * 4) + 1
          }`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          resolve(result);
          $("div.grid-archive > div > div > article").each(function (a, b) {
            let script = $(this).find("script").get();
            let parse;
            for (let anu of script) {
              parse = JSON.parse(anu.children[0].data);
            }
            result.push({
              title: parse.name,
              genre: parse.genre[0],
              dateCreated: parse.dateCreated,
              director: parse.director[0].name,
              duration: parse.duration.split("PT")[1],
              rating: parse.aggregateRating.ratingValue,
              review: parse.aggregateRating.reviewCount,
              bestRating: parse.aggregateRating.bestRating,
              type: parse.hasPart.description,
              thumbnail: parse.image,
              url: parse.url,
            });
          });
        })
        .catch(reject);
    });
  }

  Ftv() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://149.56.24.226/ftv/page/${Math.floor(Math.random() * 4) + 1}`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            },
          }
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          resolve(result);
          $("div.grid-archive > div > div > article").each(function (a, b) {
            result.push({
              title: $(this).find("figure > a > img").attr("alt"),
              thumbnail: $(this).find("figure > a > img").attr("src"),
              url: $(this).find("figure > a").attr("href"),
            });
          });
        })
        .catch(reject);
    });
  }

  Series() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://149.56.24.226/series/page/${
            Math.floor(Math.random() * 4) + 1
          }`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.grid-archive > div > div > article").each(function (a, b) {
            result.push({
              title: $(this).find("figure > a > img").attr("alt"),
              rating: $(this).find("figure > div > div.rating").text(),
              thumbnail: "https" + $(this).find("figure > a > img").attr("src"),
              url: $(this).find("figure > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Years(year) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://149.56.24.226/year/${year}`)
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.grid-archive > div > div > article").each(function (a, b) {
            result.push({
              title: $(this).find("figure > a > img").attr("alt"),
              rating: $(this).find("figure > div > div.rating").text(),
              thumbnail: "https" + $(this).find("figure > a > img").attr("src"),
              url: $(this).find("figure > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Country(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://149.56.198.206/country/${query.toLowerCase()}/page/${
            Math.floor(Math.random() * 4) + 1
          }`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.grid-archive > div > div > article").each(function (a, b) {
            let script = $(this).find("script").get();
            let parse;
            for (let anu of script) {
              parse = JSON.parse(anu.children[0].data);
            }
            result.push({
              type: parse["@type"],
              title: parse.name,
              created: parse.dateCreated,
              published: parse.datePublished,
              director: parse.director[0].name,
              duration: parse.duration.split("PT")[1],
              genre: parse.genre[0],
              rating: parse.aggregateRating.ratingValue,
              review: parse.aggregateRating.reviewCount,
              bestRating: parse.aggregateRating.bestRating,
              thumbnail: parse.image,
              url: parse.url,
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }
}

class FilmApik {
  constructor() {}
  Search(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://5.182.209.205/?s=${encodeURIComponent(query)}`, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.result-item > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.details > div.title > a").text(),
              rating: $(this)
                .find("div.details > div.meta > span.rating")
                .text()
                .split("IMDb ")[1],
              thumbnail: $(this)
                .find("div.image > div.thumbnail > a > img")
                .attr("data-src"),
              url: $(this).find("div.image > div.thumbnail > a").attr("href"),
              description: $(this).find("div.details > div.contenido").text(),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Category(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://5.182.209.205/category/${encodeURIComponent(query)}`, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.items > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.poster > img").attr("alt"),
              rating: $(this).find("div.poster > div.rating").text(),
              thumbnail: $(this).find("div.poster > img").attr("data-src"),
              url: $(this).find("div.poster > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Years(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://5.182.209.205/release-year/${encodeURIComponent(query)}`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            },
          }
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.items > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.poster > img").attr("alt"),
              rating: $(this).find("div.poster > div.rating").text(),
              thumbnail: $(this).find("div.poster > img").attr("data-src"),
              url: $(this).find("div.poster > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Country(query) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://5.182.209.205/negara/${encodeURIComponent(query)}`, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.items > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.poster > img").attr("alt"),
              rating: $(this).find("div.poster > div.rating").text(),
              thumbnail: $(this).find("div.poster > img").attr("data-src"),
              url: $(this).find("div.poster > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Trending() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://5.182.209.205/trending/page/${
            Math.floor(Math.random() * 5) + 1
          }`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            },
          }
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.items > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.poster > img").attr("alt"),
              rating: $(this).find("div.poster > div.rating").text(),
              thumbnail: $(this).find("div.poster > img").attr("data-src"),
              url: $(this).find("div.poster > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Rating() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://5.182.209.205/ratings/page/${
            Math.floor(Math.random() * 5) + 1
          }`,
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            },
          }
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.items > article").each(function (a, b) {
            result.push({
              title: $(this).find("div.poster > img").attr("alt"),
              rating: $(this).find("div.poster > div.rating").text(),
              thumbnail: $(this).find("div.poster > img").attr("data-src"),
              url: $(this).find("div.poster > a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }
}
module.exports = { FilmApik, LK21 };
