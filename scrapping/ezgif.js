const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data");

class Ezgif {
  constructor() {}
  toMp4(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://ezgif.com/webp-to-mp4?url=${url}`)
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const bodyFormThen = new formData();
          const file = $('input[name="file"]').attr("value");
          const convert = $('input[name="convert"]').attr("value");
          const actionpost = $("form").attr("action");
          bodyFormThen.append("file", file);
          bodyFormThen.append("convert", convert);
          await axios
            .request({
              method: "POST",
              url: "https://ezgif.com/webp-to-mp4/" + file,
              data: bodyFormThen,
              headers: {
                "Content-Type": `multipart/form-data; boundary=${bodyFormThen._boundary}`,
              },
            })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const result =
                "https:" +
                $("div#output > p.outfile > video > source").attr("src");
              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  toWebp(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://ezgif.com/png-to-webp?url=${url}`)
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const form = new formData();
          const file = $('input[name="file"]').attr("value");
          const convert = $('input[name="convert"]').attr("value");
          const actionpost = $("form").attr("action");
          form.append("file", file);
          form.append("convert", convert);
          await axios
            .request({
              method: "POST",
              url: actionpost,
              data: form,
              headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
              },
            })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const result =
                "https:" +
                $('div[id="output"]').find("p").first().find("img").attr("src");
              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  reverseVideo(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://ezgif.com/reverse-video?url=${url}`)
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const dataValue = $("form > input")
            .get()
            .map((a) => {
              return {
                name: $(a).attr("name"),
                value: $(a).attr("value"),
              };
            })[0];
          const actionpost = $("form").attr("action");
          await axios
            .request({
              method: "POST",
              url: actionpost + "?ajax=true",
              data: `${dataValue.name}=${dataValue.value}&mute=on&encoding=original`,
            })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const datext = $("p.outfile > video > source")
                .attr("src")
                .split(".");
              const ext = datext[datext.length - 1];
              const result =
                "https:" + $("p.outfile > video > source").attr("src");
              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = { Ezgif };
