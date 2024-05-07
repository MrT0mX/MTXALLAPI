var jimp = require("jimp");
var { default: axios, isAxiosError } = require("axios");
var cheerio = require("cheerio");
var FormData = require("form-data");
var qs = require("qs");
var functions = require("../library/functions");
var fakeUa = require("../controller/fakeUa");

class Ephoto {
  constructor() {}
  text(res, url, text) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({ method: "GET", url })
        .then(async (resultOne) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(resultOne.data);
          const formDataAppend = new FormData();
          let inputData = new Array();
          $("form.ajax-submit")
            .find("input")
            .get()
            .map((mappingData) => {
              inputData.push({
                name: $(mappingData).attr("name"),
                value: $(mappingData).attr("value"),
              });
            });
          const filterInputData = inputData.filter(
            (filtering) => filtering.name !== "text[]"
          );
          if (typeof text == "string") text = [text];
          for (let teks of text) formDataAppend.append("text[]", teks);
          formDataAppend.append(
            filterInputData[0].name,
            filterInputData[0].value
          );
          formDataAppend.append(
            filterInputData[1].name,
            filterInputData[1].value
          );
          formDataAppend.append(
            filterInputData[2].name,
            filterInputData[2].value
          );
          formDataAppend.append(
            filterInputData[3].name,
            filterInputData[3].value
          );
          const getCookies = resultOne.headers["set-cookie"];
          await axios
            .request({
              method: "POST",
              url,
              data: formDataAppend,
              headers: {
                ...formDataAppend.getHeaders(),
                "User-Agent": fakeUa(),
                Cookie: getCookies,
              },
            })
            .then(async (resultTwo) => {
              if (isAxiosError()) throw "axios error";
              const _ = cheerio.load(resultTwo.data);
              const getDataJson = _("input#form_value_input").attr("value");
              const getDataJsonParse = JSON.parse(getDataJson);
              const getDataStringify = qs.stringify(getDataJsonParse);
              await axios
                .request({
                  method: "POST",
                  url: "https://en.ephoto360.com/effect/create-image",
                  data: getDataStringify,
                  headers: {
                    "User-Agent": fakeUa(),
                    Cookie: getCookies,
                  },
                })
                .then((resultThree) => {
                  if (isAxiosError()) throw "axios error";
                  resolve(filterInputData[2].value + resultThree.data.image);
                })
                .catch(() => res.json(functions.loghandler.error));
            })
            .catch(() => res.json(functions.loghandler.error));
        })
        .catch(() => res.json(functions.loghandler.error));
    });
  }
  image(res, url, link, text = ["Fxc7", "RestAPIs"], agent) {
    return new Promise(async (resolve, reject) => {
      let urlCookie = await axios.get(url);
      let buffer, width, height;
      await jimp
        .read(link)
        .then((image) => {
          width = image.bitmap.width;
          height = image.bitmap.height;
          image.getBuffer(
            image._originalMime,
            async function (error, response) {
              if (error) return reject(error);
              buffer = response;
            }
          );
        })
        .catch(() =>
          functions.resError(
            res,
            "failed loaded image, please input url image correctly"
          )
        );
      const formUpload = new FormData();
      formUpload.append("myfile", buffer, {
        filename: "blob",
        contentType: "image/png",
        ...(agent && { agent }),
      });
      await axios
        .request({
          method: "POST",
          url: "https://e2.yotools.net",
          data: formUpload,
          headers: { ...formUpload.getHeaders() },
        })
        .then(async (resultOne) => {
          if (isAxiosError()) throw "axios error";
          const formData = new FormData();
          const imageUpload = JSON.stringify({
            image: resultOne.data.uploaded_file,
            image_thumb: resultOne.data.thumb_file,
            icon_file: resultOne.data.icon_file,
            x: 0,
            y: 0,
            width: width,
            height: height,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            thumb_width: width,
          });
          let forms = {
            submit: "Create a photo",
            token: /name="token".*value="(.+?)"/.exec(urlCookie.data)[1],
            build_server: "https://s1.ephoto360.com",
            build_server_id: 1,
          };
          if (typeof text == "string") text = [text];
          for (let teks of text) formData.append("text[]", teks);
          for (let key in forms) formData.append(key, forms[key]);
          formData.append("file_image_input", "");
          formData.append("image[]", imageUpload);
          await axios
            .request({
              method: "POST",
              url,
              data: formData.getBuffer(),
              headers: {
                ...formData.getHeaders(),
                Cookie: urlCookie.headers["set-cookie"],
              },
            })
            .then(async (resultTwo) => {
              if (isAxiosError()) throw "axios error";
              let getToken = /name="form_value_input".*value="(.+?)"/.exec(
                resultTwo.data
              )[1];
              const parseData = JSON.parse(getToken.split("&quot;").join('"'));
              await axios({
                method: "POST",
                url: "https://en.ephoto360.com/effect/create-image",
                data: qs.stringify(parseData),
                headers: {
                  "User-Agent": fakeUa(),
                  Cookie: urlCookie.headers["set-cookie"],
                },
              })
                .then((resultThree) => {
                  if (isAxiosError()) throw "axios error";
                  resolve("https://s1.ephoto360.com" + resultThree.data.image);
                })
                .catch(() => res.json(functions.loghandler.error));
            })
            .catch(() => res.json(functions.loghandler.error));
        })
        .catch(() => res.json(functions.loghandler.error));
    });
  }
  radio_text(res, url, text) {
    return new Promise(async (resolve, reject) => {
      let getCookie = await axios.get(url);
      if (isAxiosError()) throw "axios error";
      const $ = cheerio.load(getCookie.data);
      let inputData = new Array();
      $("form.ajax-submit")
        .find("input")
        .get()
        .map((mapData) => {
          inputData.push({
            name: $(mapData).attr("name"),
            value: $(mapData).attr("value"),
          });
        });
      const inputDataFilterRadio = inputData.filter(
        (fill) => fill.name == "radio0[radio]"
      );
      const inputDataFilter = inputData.filter(
        (fill) => fill.name !== "radio0[radio]"
      );
      const inputDataFilterText = inputDataFilter.filter(
        (fill) => fill.name !== "text[]"
      );
      const randomFilterInput =
        inputDataFilterRadio[
          Math.floor(Math.random() * inputDataFilterRadio.length)
        ];
      let formData = new FormData();
      for (let i = 0; i < inputDataFilterText.length; i++) {
        formData.append(
          inputDataFilterText[i].name,
          inputDataFilterText[i].value
        );
        formData.append(randomFilterInput.name, randomFilterInput.value);
        if (typeof text == "string") text = [text];
        for (let teks of text) formData.append("text[]", teks);
        formData.append(
          inputDataFilterText[i].name,
          inputDataFilterText[i].value
        );
        formData.append(
          inputDataFilterText[i].name,
          inputDataFilterText[i].value
        );
        formData.append(
          inputDataFilterText[i].name,
          inputDataFilterText[i].value
        );
        formData.append(
          inputDataFilterText[i].name,
          inputDataFilterText[i].value
        );
      }
      await axios
        .request({
          method: "POST",
          url: url,
          data: formData.getBuffer(),
          headers: {
            ...formData.getHeaders(),
            "User-Agent": fakeUa(),
            Cookie: getCookie.headers["set-cookie"],
          },
        })
        .then(async (resultOne) => {
          if (isAxiosError()) throw "axios error";
          const getToken = /name="form_value_input".*value="(.+?)"/.exec(
            resultOne.data
          )[1];
          const getServerId = /name="build_server".*value="(.+?)"/.exec(
            getCookie.data
          )[1];
          const tokenSplit = getToken.split("&quot;").join('"');
          const parseJson = JSON.parse(tokenSplit);
          await axios
            .request({
              method: "POST",
              url: "https://en.ephoto360.com/effect/create-image",
              data: qs.stringify(parseJson),
              headers: {
                "User-Agent": fakeUa(),
                Cookie: getCookie.headers["set-cookie"],
              },
            })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              resolve(getServerId + data.image);
            })
            .catch(() => res.json(functions.loghandler.error));
        })
        .catch(() => res.json(functions.loghandler.error));
    });
  }
}

module.exports = { Ephoto };
