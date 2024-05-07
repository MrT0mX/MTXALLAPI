const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data");
const qs = require("qs");
const fakeUa = require("../controller/fakeUa");

class Textprome {
  constructor() {}
  text(url, text) {
    return new Promise(async (resolve, reject) => {
      if (!url) reject("url wrong!!");
      await axios
        .request({
          method: "GET",
          url,
          headers: {
            "User-Agent": fakeUa(),
          },
        })
        .then(async (resultOne) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(resultOne.data);
          let getOneCookies = resultOne.headers["set-cookie"];
          let dataFromResult = new Array();
          $("form.ajax-submit")
            .find("input")
            .get()
            .map((mappingInput) => {
              dataFromResult.push({
                name: $(mappingInput).attr("name"),
                value: $(mappingInput).attr("value"),
              });
            });
          const FormDataAppend = new formData();
          let dataResultFilter = dataFromResult.filter(
            (formDataFilter) => formDataFilter.name !== "text[]"
          );
          if (typeof text === "string") text = [text];
          for (let teks of text) FormDataAppend.append("text[]", teks);
          FormDataAppend.append(
            dataResultFilter[0].name,
            dataResultFilter[0].value
          );
          FormDataAppend.append(
            dataResultFilter[1].name,
            dataResultFilter[1].value
          );
          FormDataAppend.append(
            dataResultFilter[2].name,
            dataResultFilter[2].value
          );
          FormDataAppend.append(
            dataResultFilter[3].name,
            dataResultFilter[3].value
          );
          await axios
            .request({
              method: "POST",
              url,
              data: FormDataAppend,
              headers: {
                ...FormDataAppend.getHeaders(),
                Accept: "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "User-Agent": fakeUa(),
                Cookie: getOneCookies,
              },
            })
            .then(async (resultTwo) => {
              if (isAxiosError()) throw "axios error";
              const getData = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(
                resultTwo.data
              );
              const dataJson = JSON.parse(getData[1]);
              const dataStringify = qs.stringify(dataJson);
              await axios({
                method: "POST",
                url: "https://textpro.me/effect/create-image",
                data: dataStringify,
                headers: {
                  Accept: "*/*",
                  "Accept-Language": "en-US,en;q=0.9",
                  "User-Agent": fakeUa(),
                  Cookie: getOneCookies,
                },
              })
                .then((resultThree) => {
                  if (isAxiosError()) throw "axios error";
                  resolve(
                    "https://textpro.me" + resultThree.data.fullsize_image
                  );
                })
                .catch(reject);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
}

module.exports = { Textprome };
