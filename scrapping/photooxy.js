const formData = require("form-data");
const qs = require("qs");
const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const jimp = require("jimp");

class Photooxy {
  constructor() {}
  text(url, text) {
    return new Promise(async (resolve, reject) => {
      let cookies;
      let build_server;
      await axios
        .request({
          method: "GET",
          url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(async ({ data, headers }) => {
          if (isAxiosError()) throw "axios error";
          cookies = headers["set-cookie"];
          const $ = cheerio.load(data);
          const token = $("input[name='token']").attr("value");
          build_server = $("input[name='build_server']").attr("value");
          const build_server_id = $("input[name='build_server_id']").attr(
            "value"
          );
          const fd = new formData();
          if (typeof text == "string") text = [text];
          for (let teks of text) fd.append("text[]", teks);
          fd.append("submit", "GO");
          fd.append("token", token);
          fd.append("build_server", build_server);
          fd.append("build_server_id", build_server_id);
          await axios
            .request({
              method: "POST",
              url,
              data: fd,
              headers: {
                ...fd.getHeaders(),
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                Cookie: cookies,
              },
            })
            .then(async ({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const id = JSON.parse($("div.sr-only").text());
              await axios
                .request({
                  method: "POST",
                  url: "https://photooxy.com/effect/create-image",
                  data: qs.stringify(id),
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                    Cookie: cookies,
                  },
                })
                .then(({ data }) => {
                  if (isAxiosError()) throw "axios error";
                  resolve(build_server + data.image);
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  radio(url, text) {
    return new Promise(async (resolve, reject) => {
      let cookies;
      let build_server;
      await axios
        .request({
          method: "GET",
          url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(async ({ data, headers }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let inputDataRadio = new Array();
          let inputDataAll = new Array();
          $("form.ajax-submit")
            .find("input[name='radio0[radio]']")
            .get()
            .map((mapping) => {
              inputDataRadio.push($(mapping).attr("value"));
            });
          $("form.ajax-submit")
            .find("input[type='hidden']")
            .get()
            .map((mapping) => {
              inputDataAll.push({
                name: $(mapping).attr("name"),
                value: $(mapping).attr("value"),
              });
            });
          cookies = headers["set-cookie"];
          build_server = inputDataAll[1].value;
          const fd = new formData();
          const randomRadio =
            inputDataRadio[Math.floor(Math.random() * inputDataRadio.length)];
          fd.append("radio0[radio]", randomRadio);
          if (typeof text == "string") text = [text];
          for (let teks of text) fd.append("text[]", teks);
          fd.append("submit", "GO");
          fd.append(inputDataAll[0].name, inputDataAll[0].value);
          fd.append(inputDataAll[1].name, inputDataAll[1].value);
          fd.append(inputDataAll[2].name, inputDataAll[2].value);
          await axios
            .request({
              method: "POST",
              url,
              data: fd,
              headers: {
                ...fd.getHeaders(),
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                Cookie: cookies,
              },
            })
            .then(async ({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const id = $("div.sr-only").text();
              const parse = JSON.parse(id);
              const stringify = qs.stringify(parse);
              await axios
                .request({
                  method: "POST",
                  url: "https://photooxy.com/effect/create-image",
                  data: stringify,
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                    Cookie: cookies,
                  },
                })
                .then(({ data }) => {
                  if (isAxiosError()) throw "axios error";
                  resolve(build_server + data.image);
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  image(url, link, agent) {
    return new Promise(async (resolve, reject) => {
      let getDataOne = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        },
      });
      if (isAxiosError()) throw "axios error";
      const _ = cheerio.load(getDataOne.data);
      let cookies = getDataOne.headers["set-cookie"];
      let token = _("input[name='token']").attr("value");
      let build_server = "https://e1.yotools.net";
      let build_server_id = _("input[name='build_server_id']").attr("value");
      let buffer;
      let width;
      let height;
      await jimp
        .read(link)
        .then((image) => {
          width = image.bitmap.width;
          height = image.bitmap.height;
          image.getBuffer(image._originalMime, function (error, response) {
            buffer = response;
          });
        })
        .catch(reject);
      if (!Buffer.isBuffer(buffer)) return reject("Buffer is not a buffer");
      const formUpload = new formData();
      formUpload.append("myfile", Buffer.from(buffer), {
        filename: "blob",
        contentType: "image/png",
        ...(agent && { agent }),
      });
      await axios
        .request({
          method: "POST",
          url: "https://e1.yotools.net/upload",
          data: formUpload,
          headers: { ...formUpload.getHeaders() },
        })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const formPostData = new formData();
          const imageUpload = JSON.stringify({
            image: data.uploaded_file,
            image_thumb: data.thumb_file,
            icon_file: data.icon_file,
            x: 0,
            y: 0,
            width: width,
            height: height,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            thumb_width: width,
          });
          formPostData.append("file_image_input", "");
          formPostData.append("image[]", imageUpload);
          formPostData.append("submit", "GO");
          formPostData.append("token", token);
          formPostData.append("build_server", build_server);
          formPostData.append("build_server_id", build_server_id);
          await axios
            .request({
              method: "POST",
              url,
              data: formPostData,
              headers: {
                ...formPostData.getHeaders(),
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                Cookie: cookies,
              },
            })
            .then(async ({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              const tokenID = $("div.sr-only").text();
              const parse = JSON.parse(tokenID);
              const stringify = qs.stringify(parse);
              await axios
                .request({
                  method: "POST",
                  url: "https://photooxy.com/effect/create-image",
                  data: stringify,
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
                    Cookie: cookies,
                  },
                })
                .then(({ data }) => {
                  if (isAxiosError()) throw "axios error";
                  resolve(build_server + data.image);
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = { Photooxy };
