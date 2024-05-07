const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const fakeUa = require("../controller/fakeUa");

class Games {
  constructor() {}
  tebakGambar() {
    return new Promise(async (resolve, reject) => {
      let random_level = Math.floor(Math.random() * 136);
      let random_eq = Math.floor(Math.random() * 20);
      await axios
        .get(`https://jawabantebakgambar.net/level-${random_level}/`, {
          headers: { "User-Agent": fakeUa() },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          let url = "https://jawabantebakgambar.net";
          const $ = cheerio.load(data);
          let href = $("ul > * > a").eq(random_eq);
          let jwbn = href.find("span").text();
          let img = href.find("img").attr("data-src");
          let src = url + img;
          let petunjuk = jwbn.replace(/[AIUEO|aiueo]/g, "_");
          resolve({
            image: src,
            jawaban: jwbn,
            petunjuk,
          });
        })
        .catch(reject);
    });
  }

  asahotak() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://www.cademedia.com/jawaban-tebak-tebakan-asah-otak", {
          headers: { "User-Agent": fakeUa() },
        })
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          let data = new Array();
          let y;
          const go = $("body").find("div.entry-content").text().split("P:");
          for (let i = 2; i < go.length; i++) {
            const x = go[i].split("J:")[0].trim();
            switch (i) {
              case 229:
                y = go[i]
                  .split("J:")[1]
                  .split("Level")[0]
                  .split("Demikian")[0]
                  .trim();
                break;
              default:
                y = go[i].split("J:")[1].split("Level")[0].trim();
            }
            data.push({
              pertanyaan: x,
              jawaban: y,
            });
          }
          resolve(data);
        })
        .catch(reject);
    });
  }

  family100() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://teknologital.com/kunci-jawaban-ica-ica", {
          headers: { "User-Agent": fakeUa() },
        })
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          let data = new Array();
          let y;
          const go = $("body")
            .find("article.blog-post > div.row > div")
            .text()
            .split("Jawaban :");
          for (let i = 1; i < go.length; i++) {
            y = go[i - 1].split("\n")[1].trim();
            const z = go[i].split("\n")[0].trim();
            if (i !== 1) {
              data.push({
                pertanyaan: y,
                jawaban: z,
              });
            }
          }
          resolve(data);
        })
        .catch(reject);
    });
  }

  siapakah() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://tutorialaplikasi.com/kunci-jawaban-tebak-siapakah-aku/", {
          headers: { "User-Agent": fakeUa() },
        })
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          let data = new Array();
          $("body")
            .find("li")
            .each(function (index, element) {
              let x = $(this).html().split("<strong>")[0];
              let y = $(this).find("strong").text();
              data.push({
                pertanyaan: x,
                jawaban: y,
              });
            });
          data.splice(0, 11);
          data.splice(100, 131);
          resolve(data);
        })
        .catch(reject);
    });
  }

  siapakah2() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://jagat-nusantara.blogspot.com/2018/01/kunci-jawaban-tebak-siapakah-aku-m.html",
          { headers: { "User-Agent": fakeUa() } }
        )
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          let data = new Array();
          let y, x;
          const go = $("div.post-body").text();
          for (let i = 1; i < 535; i++) {
            y = go.split(i + ".")[1].split(".")[0];
            x = go
              .split(i + ".")[1]
              .split("Jawaban: ")[1]
              .split("\n")[0];
            data.push({
              pertanyaan: y,
              jawaban: x,
            });
          }
          resolve(data);
        })
        .catch(reject);
    });
  }

  susunkata() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://www.cademedia.com/jawaban-tebak-tebakan-susun-kata", {
          headers: { "User-Agent": fakeUa() },
        })
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          let data = new Array();
          const go = $("body").find("article").text();
          let v, x, y;
          for (let i = 2; i < 350; i++) {
            v = go.split("Level " + i)[1].split(":")[0];
            x = go.split("Level " + i)[1].split(":")[1];
            if (
              i !== 21 &&
              i !== 51 &&
              i !== 101 &&
              i !== 151 &&
              i !== 201 &&
              i !== 251 &&
              i !== 301
            ) {
              if (
                i == 50 ||
                i == 100 ||
                i == 150 ||
                i == 200 ||
                i == 250 ||
                i == 250 ||
                i == 300
              ) {
                y = go
                  .split("Level " + i)[1]
                  .split("Jawaban")[1]
                  .split("Susun")[0];
              } else {
                y = go
                  .split("Level " + i)[1]
                  .split("Jawaban")[1]
                  .split("Level")[0];
              }
              data.push({
                tipe: v.trim(),
                huruf: x.replace(/(Jawaban)/gi, "").trim(),
                jawaban: y.replace(/:/g, "").trim(),
              });
            }
          }
          data.splice(0, 2);
          resolve(data);
        })
        .catch(reject);
    });
  }

  tekateki() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://www.kabargames.id/kunci-jawaban-tebak-tebakan-2020", {
          headers: { "User-Agent": fakeUa() },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          let x = $("article.Wysiwyg").text();
          let q, a;
          for (let i = 1; i < 201; i++) {
            q = x
              .split("Level " + i + "\nPertanyaan:")[1]
              .split("\nJawaban")[0]
              .trim();
            a = x
              .split("Level " + i + "\nPertanyaan:")[1]
              .split("\nJawaban: ")[1]
              .trim();
            result.push({
              pertanyaan: q,
              jawaban: a.split("\n")[0],
            });
          }
          resolve(result);
        })
        .catch(reject);
    });
  }

  cakLontong() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://gamedaim.com/tips/kunci-jawaban-tts-cak-lontong-2020/amp/",
          { headers: { "User-Agent": fakeUa() } }
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.amp-wp-article-content").each(function (a, b) {
            const xx = $(this)
              .find("p")
              .next()
              .next()
              .next()
              .next()
              .next()
              .next()
              .next()
              .text();
            for (let i = 1; i < 100; i++) {
              result.push({
                pertanyaan: xx.split(/Pertanyaan:/gi)[i].split(/Jawaban:/gi)[0],
                jawaban: xx.split(/Jawaban:/gi)[i].split(/Keterangan:/gi)[0],
                keterangan: xx
                  .split(/Keterangan:/gi)
                  [i].split(/Pertanyaan:/gi)[0],
              });
            }
          });
          resolve(result);
        })
        .catch(reject);
    });
  }
}
module.exports = { Games };
