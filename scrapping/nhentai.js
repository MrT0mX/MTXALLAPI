"use strict";

const cheerio = require("cheerio");
const { default: axios, isAxiosError } = require("axios");

class Nhentai {
  constructor() {}
  Search(query) {
    return new Promise(async (resolve, reject) => {
      const BaseURL = "https://nhentai.net";
      const path = "/search/?q=";
      await axios({
        method: "GET",
        url: BaseURL + path + query,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          Cookie:
            "csrftoken=17TSy54cYatlvfQsLvjc7yJxaGlBskEJYKgMuOjO1Q0BKXamQ8BHDvZRUt8RCQUH",
        },
      })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.index-container > div.gallery").each(function (a, b) {
            result.push({
              title: $(this).find("a > div.caption").text(),
              thumbnail: $(this).find("a > img").attr("data-src"),
              url: BaseURL + $(this).find("a").attr("href"),
            });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  Code(code) {
    return new Promise(async (resolve, reject) => {
      const BaseURL = "https://nhentai.net/g/";
      await axios({
        method: "GET",
        url: BaseURL + code,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          Cookie:
            "csrftoken=17TSy54cYatlvfQsLvjc7yJxaGlBskEJYKgMuOjO1Q0BKXamQ8BHDvZRUt8RCQUH",
        },
      })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const titleID =
            $("div#info > h1.title > span.before").text() +
            " " +
            $("div#info > h1.title > span.pretty").text() +
            " " +
            $("div#info > h1.title > span.after").text();
          const titleJP =
            $("div#info > h2.title > span.before").text() +
            " " +
            $("div#info > h2.title > span.pretty").text() +
            " " +
            $("div#info > h2.title > span.after").text();
          const thumbnail = $("div#cover > a > img").attr("data-src");
          const code = $("div#info > h3#gallery_id").text().trim();
          const parodies = $("div#info > section#tags > div")
            .text()
            .trim()
            .split(/\n/g)
            .map((obj) => obj.replace(/\t/g, ""));
          const meta = [
            { [parodies[0]]: !parodies[1] ? "Nothing" : parodies[1] },
            { [parodies[2]]: !parodies[3] ? "Nothing" : parodies[3] },
            { [parodies[4]]: !parodies[5] ? "Nothing" : parodies[5] },
            { [parodies[6]]: !parodies[7] ? "Nothing" : parodies[7] },
            { [parodies[8]]: !parodies[9] ? "Nothing" : parodies[9] },
            { [parodies[10]]: !parodies[11] ? "Nothing" : parodies[11] },
            { [parodies[12]]: !parodies[13] ? "Nothing" : parodies[13] },
            { [parodies[14]]: !parodies[15] ? "Nothing" : parodies[15] },
            { [parodies[16]]: !parodies[17] ? "Nothing" : parodies[17] },
          ];

          let cover = new Array();
          $("div.thumbs > div.thumb-container").each(function (a, b) {
            cover.push($(this).find("a > img").attr("data-src"));
          });
          resolve({
            titleID,
            titleJP,
            code,
            thumbnail,
            meta,
            cover,
          });
        })
        .catch(reject);
    });
  }

  Random() {
    return new Promise(async (resolve, reject) => {
      const BaseURL = "https://nhentai.net";
      await axios({
        method: "GET",
        url: BaseURL + "/random/",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          Cookie:
            "csrftoken=17TSy54cYatlvfQsLvjc7yJxaGlBskEJYKgMuOjO1Q0BKXamQ8BHDvZRUt8RCQUH",
        },
      })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const getUrlID = /<div.*id="cover"><a.*href="(.+?)"/.exec(data)[1];
          await axios({
            method: "GET",
            url: BaseURL + getUrlID.replace("1/", ""),
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
              Cookie:
                "csrftoken=17TSy54cYatlvfQsLvjc7yJxaGlBskEJYKgMuOjO1Q0BKXamQ8BHDvZRUt8RCQUH",
            },
          })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const titleID =
                $("div#info > h1.title > span.before").text() +
                " " +
                $("div#info > h1.title > span.pretty").text() +
                " " +
                $("div#info > h1.title > span.after").text();
              const titleJP =
                $("div#info > h2.title > span.before").text() +
                " " +
                $("div#info > h2.title > span.pretty").text() +
                " " +
                $("div#info > h2.title > span.after").text();
              const thumbnail = $("div#cover > a > img").attr("data-src");
              const code = $("div#info > h3#gallery_id").text().trim();
              const parodies = $("div#info > section#tags > div")
                .text()
                .replace(/\t/gi, "")
                .split(/\n/gi);
              const meta = [
                { [parodies[1]]: parodies[2] },
                { [parodies[3]]: parodies[4] },
                { [parodies[5]]: parodies[6] },
                { [parodies[7]]: parodies[8] },
                { [parodies[9]]: parodies[10] },
                { [parodies[11]]: parodies[12] },
                { [parodies[13]]: parodies[14] },
                { [parodies[15]]: parodies[16] },
                { [parodies[17]]: parodies[18] },
              ];
              let cover = new Array();
              $("div.thumbs > div.thumb-container").each(function (a, b) {
                cover.push($(this).find("a > img").attr("data-src"));
              });
              resolve({
                titleID,
                titleJP,
                code,
                thumbnail,
                meta,
                cover,
              });
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = { Nhentai };
