const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const moment = require("moment-timezone");
const fs = require("fs");

class Information {
  constructor() {}
  Searchnabi(query) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await fs.readFileSync(
          process.cwd() + `/data/islamic/kisahnabi/${query.toLowerCase()}.json`
        );
        const json = await JSON.parse(data);
        const result = {
          name: json.name,
          kelahiran: json.thn_kelahiran + " sebelum massehi",
          wafat_usia: json.usia + " tahun",
          singgah: json.tmp,
          thumbnail: json.img_url,
          kisah: json.description,
        };
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }
  Cuaca(kota) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=132d0c03530775bbbfa9b298392866df`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          if (data.cod == 404) {
            resolve(data.message);
          } else {
            let sunrise =
              (await moment
                .tz(data.sys.sunrise * 1000, "Asia/Dhaka")
                .format("DD, MM - yy : HH:mm")) + " WIB";
            let sunset =
              (await moment
                .tz(data.sys.sunset * 1000, "Asia/Dhaka")
                .format("DD, MM - yy : HH:mm")) + " WIB";
            const result = {
              Name: data.name + ", " + data.sys.country,
              Longitude: data.coord.lon,
              Latitude: data.coord.lat,
              sunrise,
              sunset,
              Suhu: data.main.temp + " C",
              Angin: data.wind.speed + " m/s",
              Kelembaban: data.main.humidity + "%",
              Cuaca: data.weather[0].main,
              Keterangan: data.weather[0].description,
              Udara: data.main.pressure + " HPa",
            };
            resolve(result);
          }
        })
        .catch(reject);
    });
  }

  infoGempa() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("https://www.bmkg.go.id/")
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const result = {
            title: $("div.gempabumi-home-bg > div > div > a").attr("title"),
            waktu: $(
              "div.gempabumi-home-bg > div > div.gempabumi-detail > ul > li:nth-child(1)"
            ).text(),
            magnitude: $(
              "div.gempabumi-home-bg > div > div.gempabumi-detail > ul > li:nth-child(2)"
            ).text(),
            koordinat: $(
              "div.gempabumi-home-bg > div > div.gempabumi-detail > ul > li:nth-child(3)"
            ).text(),
            lokasi: $(
              "div.gempabumi-home-bg > div > div.gempabumi-detail > ul > li:nth-child(4)"
            ).text(),
            dirasakan: $(
              "div.gempabumi-home-bg > div > div.gempabumi-detail > ul > li:nth-child(5)"
            ).text(),
            thumbnail: $("div.gempabumi-home-bg > div > div > a").attr("href"),
          };
          resolve(result);
        })
        .catch(reject);
    });
  }

  trendtweet(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://twitter-trends.iamrohit.in/${query.toLowerCase()}`)
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          let hasil = new Array();
          const $ = cheerio.load(data);
          const message = $("html > head > title").text().trim();
          const updated_at = $("div.panel-body > p > b:nth-child(2)").text();
          $("tbody#copyData > tr").each(function (a, b) {
            hasil.push({
              trending_number:
                $(this).find("th:nth-child(2) > a").attr("rank") || undefined,
              hastag: $(this).find("th:nth-child(2) > a").text().trim(),
              tweet_count: $(this)
                .find("th:nth-child(2) > div > span")
                .text()
                .trim(),
              url: $(this).find("th:nth-child(2) > a").attr("href"),
            });
          });
          resolve({
            message,
            updated_at,
            result: hasil.filter((a) => a.trending_number !== undefined),
          });
        })
        .catch(reject);
    });
  }

  trendgoogle(query) {
    return new Promise(async (resolve, reject) => {
      const str = query.substring(0, 1).toUpperCase();
      const str2 = query.substring(query.length, 1).toLowerCase();
      await axios
        .get(`https://gtrends.iamrohit.in/${str + str2}`)
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          let result = new Array();
          const $ = cheerio.load(data);
          const message = $("html > head > title").text().trim();
          const updated_at = $(
            "div.xs-12:nth-child(2) > div > div > div > h1 > span"
          )
            .text()
            .trim();
          $("div.xs-12:nth-child(2) > div > div.row").each(function (a, b) {
            result.push({
              title:
                $(this).find("div.col-md-9 > ul > li > a").text().trim() ||
                undefined,
              thumbnail: $(this).find("div.col-md-3 > img").attr("src"),
              url: $(this).find("div.col-md-9 > ul > li > a").attr("href"),
            });
          });
          resolve({
            message,
            updated_at,
            result: result.filter((a) => a.title !== undefined),
          });
        })
        .catch(reject);
    });
  }

  trendyoutube(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(url)
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          let result = new Array();
          const $ = cheerio.load(data);
          const message = $("html > head > title").text().trim();
          const updated_at = $("div.md-9 > div > div > div > h1 > span").text();
          $("div.md-9 > div > div.row").each(function (a, b) {
            result.push({
              title:
                $(this).find("div.col-md-4 > a > img").attr("title") ||
                undefined,
              thumbnail: $(this).find("div.col-md-4 > a > img").attr("src"),
              url: $(this).find("div.col-md-4 > a").attr("href"),
              channel: $(this)
                .find("div.col-md-8 > p:nth-child(2) > b:nth-child(1)")
                .text()
                .trim(),
              uploaded_at: $(this)
                .find("div.col-md-8 > p:nth-child(2) > b:nth-child(2)")
                .text()
                .trim(),
              viewers:
                $(this)
                  .find("div.col-md-8 > p:nth-child(3) > b:nth-child(2)")
                  .text()
                  .trim() + " Views",
              likes:
                $(this)
                  .find("div.col-md-8 > p:nth-child(3) > b:nth-child(4)")
                  .text()
                  .trim() + " Likes",
              dislikes:
                $(this)
                  .find("div.col-md-8 > p:nth-child(3) > b:nth-child(6)")
                  .text()
                  .trim() + " Dislike",
              comments:
                $(this)
                  .find("div.col-md-8 > p:nth-child(3) > b:nth-child(8)")
                  .text()
                  .trim() + " Comment",
              description: $(this)
                .find("div.col-md-8 > p:nth-child(5)")
                .text()
                .trim(),
            });
          });
          resolve({
            message,
            updated_at,
            result: result.filter((a) => a.title !== undefined),
          });
        })
        .catch(reject);
    });
  }
}

module.exports = { Information };
