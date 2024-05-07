const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const fakeUa = require("../controller/fakeUa");
const pintereset_headers = require("../library/settings");

class Downloader {
  constructor() {}
  async facebook(url) {
    let { data } = await axios({
      method: "POST",
      url: "https://yt1s.io/api/ajaxSearch/facebook",
      data: `q=${encodeURIComponent(url)}&vt=facebook`,
    });
    return data;
  }
  twitter(url) {
    return new Promise(async (resolve, reject) => {
      const getUrl = new URL(url);
      const getID = getUrl.pathname.split("/status/")[1];
      let { data } = await axios.get(
        "https://twitter-video-download.com/en/tweet/" + getID
      );
      if (isAxiosError()) throw "axios error";
      const $ = cheerio.load(data);
      const getData = $("script[id='__NEXT_DATA__']").get();
      for (let result of getData) {
        if (
          result &&
          result.children &&
          result.children[0] &&
          result.children[0].data
        ) {
          const json = result.children[0].data;
          const parse = JSON.parse(json);
          const stringify = parse.props.pageProps.data.json;
          let results = {
            title: stringify.text,
            username: stringify.user ? stringify.user.name : "",
            nickname: stringify.user ? stringify.user.screen_name : "",
            verified: stringify.user ? stringify.user.verified : false,
            duration: stringify.video ? stringify.video.durationMs : "0",
            like_count: stringify.favorite_count,
            comment_count: stringify.conversation_count,
            view_count: stringify.video.viewCount,
            thumbnail: stringify.video.poster,
            type: stringify.video.variants[0].type
              ? stringify.video.variants[0].type
              : stringify.video.variants[1].type
              ? stringify.video.variants[1].type
              : stringify.video.variants[2].type
              ? stringify.video.variants[2].type
              : stringify.video.variants[3].type,
            url: stringify.video.variants[0].src
              ? stringify.video.variants[0].src
              : stringify.video.variants[1].src
              ? stringify.video.variants[1].src
              : stringify.video.variants[2].src
              ? stringify.video.variants[2].src
              : stringify.video.variants[3].src,
          };
          resolve(results);
        }
      }
    });
  }
  aoivideodl(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const getTokenData = await axios.get("https://aiovideodl.ml/", {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        });
        if (isAxiosError()) throw "axios error";
        const $ = cheerio.load(getTokenData.data);
        const tokenID = $("input[name='token']").attr("value");
        const cookieHeaders = getTokenData.headers["set-cookie"];
        await axios
          .request({
            method: "POST",
            url: "https://aiovideodl.ml/wp-json/aio-dl/video-data",
            data: `url=${encodeURIComponent(url)}&token=${tokenID}`,
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
              Cookie: cookieHeaders,
            },
          })
          .then(async (response) => {
            if (isAxiosError()) throw "axios error";
            resolve(response.data);
          })
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  }
  cocofun(url) {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "GET",
          url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
            Cookie: "client_id=3f0dbd37-aa1f-42ef-995e-a410e13d8e48",
            "Set-Cookies":
              "client_id=3f0dbd37-aa1f-42ef-995e-a410e13d8e48; path=/; expires=Mon, 24 Oct 2022 18:17:26 GMT; secure",
          },
        })
        .then(async (response) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(response.data);
          const script = $("script#appState").get();
          let parse;
          for (let anu of script) {
            if (
              (anu.children && anu.children[0] && anu.children[0].data) !==
              undefined
            ) {
              const json = anu.children[0].data.split("APP_INITIAL_STATE=")[1];
              parse = JSON.parse(json);
            }
          }
          const getId = parse.share.post.post.imgs[0].id;
          const getVideo =
            parse.share.post.post.videos[getId].qualities[0].urls[0];
          const resolusi =
            parse.share.post.post.videos[getId].qualities[0].resolution;
          const getData = parse.share.post.post;
          const result = {
            title:
              getData.content + " #" + getData.topic.topic ||
              getData.topic.topic,
            desc: $("meta[property='og:description']").attr("content"),
            like: getData.likes,
            play_count: getData.playCount,
            shared: getData.share,
            resolution: resolusi,
            duration: getData.videos[getId].dur,
            thumbnail: getData.videos[getId].coverUrls[0],
            url: getVideo.url,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  pinterest(url) {
    return new Promise((resolve, reject) => {
      axios
        .request(url, {
          method: "GET",
          url: url,
          headers: pintereset_headers.pin_headers,
        })
        .then(async (response) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(response.data);
          const resulter = {
            title: $("h1.lH1").text().trim(),
            desc: $("div.hjj").text().trim(),
            thumb: $("div.__gestaltThemeVideo > video.hwa").attr("poster"),
            url: $("div.__gestaltThemeVideo > video.hwa")
              .attr("src")
              .replace(/hls/gi, "720p")
              .replace(/m3u8/gi, "mp4"),
          };
          resolve(resulter);
        })
        .catch((err) => reject(err));
    });
  }
  stickerline(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(async (response) => {
        if (isAxiosError()) throw "axios error";
        const $ = cheerio.load(response.data);
        let hasil = new Array();
        $("div.mdCMN09ImgListWarp ul.mdCMN09Ul > li.mdCMN09Li").each(function (
          a,
          b
        ) {
          const stickerJson = JSON.parse($(this).attr("data-preview"));
          hasil.push({
            type: stickerJson.type,
            id: stickerJson.id,
            static_url: stickerJson.staticUrl || "not static",
            animation_url: stickerJson.animationUrl || "not animation",
          });
        });
        let script = $("script[type='application/ld+json']").get();
        let json;
        for (let anu of script) {
          json = JSON.parse(anu.children[0].data);
        }
        const result = {
          name: json.name,
          type: json["@type"],
          author: $("a.mdCMN38Item01Author").text(),
          description: json.description,
          price: json.offers.price,
          currency: json.offers.priceCurrency,
          product_url: json.offers.url,
          thumbnail: json.image.split(";")[0],
          sticker: hasil,
        };
        resolve(result);
      });
    });
  }
}

module.exports = { Downloader };
