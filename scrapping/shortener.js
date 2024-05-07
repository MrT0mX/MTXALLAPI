const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data");

class Short {
  constructor() {}
  short(url) {
    return new Promise(async (resolve, reject) => {
      const fd = new formData();
      fd.append("u", url);
      await axios({
        method: "POST",
        url: `https://www.shorturl.at/shortener.php/`,
        data: fd,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
        },
      })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          resolve("https://" + $("input#shortenurl").attr("value"));
        })
        .catch(reject);
    });
  }

  cuttly(url) {
    return new Promise(async (resolve, reject) => {
      const fd = new formData();
      fd.append("url", url);
      fd.append("domain", 0);
      await axios
        .request({
          method: "POST",
          url: "https://cutt.ly/scripts/shortenUrl.php",
          data: fd,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${fd._boundary}`,
          },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          resolve(data);
        })
        .catch(reject);
    });
  }
}
module.exports = { Short };
