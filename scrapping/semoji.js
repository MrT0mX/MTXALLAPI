const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");

class Sticker {
  constructor() {}
  async search(query) {
    const link = await axios.get(
      `https://getstickerpack.com/stickers?query=${query}`
    );
    if (isAxiosError()) throw "axios error";
    const $ = cheerio.load(link.data);
    let result = new Array();
    $(
      "#stickerPacks > div > div.row.justify-content-center > div.sticker-pack-cols"
    ).each(function (a, b) {
      result.push({
        name: $(this).find("a > div > span.title").text().trim(),
        creator: $(this).find("a > div > span.username").text().trim(),
        url: $(this).find("a > div > img").attr("src"),
      });
    });
    return result;
  }

  async toSticker(query) {
    const resmojipedia = await axios.get(
      `https://emojipedia.org/search/?q=${encodeURIComponent(query)}`
    );
    if (isAxiosError()) throw "axios error";
    const $ = cheerio.load(resmojipedia.data);
    let result = new Array();
    const title = $("meta[property='og:title']").attr("content");
    const desc = $("meta[property='og:description']").attr("content");
    const thumb = $("meta[property='og:image']").attr("content");
    $("ul > li > div").each(function (a, b) {
      const Img = $(b).find("div.vendor-image > img").attr("src");
      const type = $(b).find("div.vendor-info > h2").text();
      result.push({
        [type]: Img,
        type,
      });
    });
    result = result.filter((tr) => tr.type !== "");
    const hasil = {
      title: title,
      desc: desc,
      thumb: thumb,
      sticker: result,
    };
    return hasil;
  }
}
module.exports = { Sticker };
