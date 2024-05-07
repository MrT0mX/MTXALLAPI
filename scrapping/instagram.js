"use strict";
const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const fakeUa = require("../controller/fakeUa");
const functions = require("../library/functions");

class Instagram {
  constructor() {
    this.headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
      Cookie: `mid=YT5aMwABAAE8mK0FHN7EHT-7pyid;ig_did=D995B665-EE36-4973-8861-2A0B4786235D;ig_nrcb=1;ds_user_id=43861906163;shbid="17127${"\\054"}43861906163${"\\054"}1670856750:01f79b44863db58824e730fc52c82d7cedc3506c041aa26c0f0bf43903dad0782059cf25";shbts="1639320750${"\\054"}43861906163${"\\054"}1670856750:01f74a65cecf18936d320a91fa0dfb796195263a1f205e3adeda2403b1440ef7b23f7c86";fbm_124024574287414=base_domain=.instagram.com;fbsr_124024574287414=2PSStdYWIn7-Disv7mVpT5PdHKopiM_cm3g46nAKjIk.eyJ1c2VyX2lkIjoiMTAwMDMzOTU5OTIzNTc4IiwiY29kZSI6IkFRQjVMMGgtdFpnY0NVWXlXaVNlRTMyRmhxUGVrRzFtNVlMdG52T1NmRnV4UG9QUDQ3WmtJU1NWa1FIMU55Z3pGaEJaZkFaYUJza0RmazJ0N18xUG9rWlprcHZMQXo5RzJaTVZyaXRnX3Fxd0UxbUsyYVBSckxUYmFlNHlmb0hRLVBxUzVpSFRtYlFGTTdxWE02UHlyeVp4cFRJRmQ3LUpuRnpWSjVCQ0QxRE5EYndiLWh6RlJWZ3lUcEZ5UEJMcG9XT1o2dW9NUzNxLWR5ZmlXRkdTWWxZdjdIZzhzZHZLdlNHTm5qQy1zZkpvYTVUOS1SaE9uR3ZIT0NqREZqbHc2UmdnUTNSM3lzcVBpUU1SaUQ2NC1NUjhJajZGY2M4OGlDVThPV2JzM1lnVS1HQW84dTIwcjJBc3QtSThVb05lcVoyQ3g5eXlUNTZaaWZ2azhEWGpLY29UIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUxaQjR0emdCMUl2cEpaQmwyRlloZmJaQUlZdURXVGJyTExlTHdPWkJVNTdtNU95UERkUmpnRWtOa20xV2Y3UmtoYmtlZTYwN0Fub2EyblpBZGpkNUtOZlZyN1RFNncyMWhIaGtZemZ4S0Z1WkFaQTVUY0ZqbHNqTER0REpkTHJFWkNEUDVxajZYeVU0R2tGVXUxRHZjYThjVWdPdDBZb01XUmJneFUwV0FiYiIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjM5NjQ5Mjc4fQ;csrftoken=oV5tUVvJDTUlqVVXo10ctGmpPbFdeU5Z;rur=PRN;sessionid=43861906163%3AkYOCESDhCRUx5t%3A7`,
      Origin: "https://www.instagram.com",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    };
  }
  download(url) {
    return new Promise(async (resolve, reject) => {
      const media_id =
        /(?<=instagram.com\/(?:p|reel|tv|([A-Za-z0-9-_.]+\/(reel|p|tv)))\/)[A-Za-z0-9-_.]+/gi.exec(
          url
        )[0];
      const fullURL = "https://www.instagram.com/p/" + media_id + "/?__a=1";
      let status = false;
      await axios
        .request({
          method: "GET",
          url: fullURL,
          headers: this.headers,
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const metadata = data.items[0];
          if (metadata.carousel_media_count) {
            const media_count = metadata.carousel_media_count;
            let result_url = new Array();
            for (let i = 0; i < media_count; i++) {
              result_url.push({
                type:
                  metadata.carousel_media[i].media_type !== 2
                    ? "image"
                    : "video",
                url: metadata.carousel_media[
                  i
                ].image_versions2.candidates.filter(
                  (fill) => fill.width === 1080
                )[0].url,
              });
            }
            resolve({
              username: metadata.user.username,
              fullname: metadata.user.full_name,
              like_count: functions.h2k(metadata.like_count),
              comment_count: functions.h2k(metadata.comment_count),
              media_count,
              caption: !metadata.caption
                ? metadata.caption
                : metadata.caption.text,
              result_url,
            });
          } else if (metadata.carousel_media_count === undefined) {
            if (metadata.media_type !== 2 || metadata.media_type === 1) {
              resolve({
                type: "image",
                media_count: "1",
                username: metadata.user.username,
                fullname: metadata.user.full_name,
                like_count: functions.h2k(metadata.like_count),
                comment_count: functions.h2k(metadata.comment_count),
                caption: !metadata.caption
                  ? metadata.caption
                  : metadata.caption.text,
                url: metadata.image_versions2.candidates[0].url,
              });
            } else if (metadata.media_type === 2 || metadata.media_type !== 1) {
              let metadata_music;
              const music_data =
                metadata.clips_metadata &&
                metadata.clips_metadata.music_info &&
                metadata.clips_metadata.music_info.music_asset_info;
              if (music_data) {
                metadata_music = {
                  music_title: music_data.title || undefined,
                  music_artist: music_data.display_artist || undefined,
                  music_url: music_data.progressive_download_url || undefined,
                };
              } else {
                metadata_music = "original song";
              }
              resolve({
                type: "video",
                media_count: "1",
                username: metadata.user.username,
                fullname: metadata.user.full_name,
                duration: metadata.video_duration.toString(),
                viewers: functions.h2k(metadata.view_count),
                play_count: functions.h2k(metadata.play_count) || 1,
                like_count: functions.h2k(metadata.like_count),
                comment_count: functions.h2k(metadata.comment_count),
                caption: !metadata.caption
                  ? metadata.caption
                  : metadata.caption.text,
                thumbnail: metadata.image_versions2.candidates[0].url,
                url: metadata.video_versions[0].url,
                metadata_music,
              });
            } else {
              throw status;
            }
          } else {
            throw status;
          }
        })
        .catch(reject);
    });
  }
  stories(url) {
    return new Promise(async (resolve, reject) => {
      const link = new URL(url);
      const getUsername = link.pathname.split("/")[2];
      let { data, statusCode, statusMessage } = await axios.get(
        "https://storiesdown.com/users/" + getUsername,
        {
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            Cookie: `_ga=GA1.2.225615087.1647003936;_gid=GA1.2.1402647672.1647003936;_gat=1;__gads=ID=b5a0da47bf8d1c17-227e1ebeedd000c2:T=16knSl5chK-NHh65gsXsg7hA;__cf_bm=21RT6HJfHadsNoOlU7V6RYYuaID78sR9QVAg8zQDD2w-16470OlU7V6RYYuaID78sR9QVAg8zQDD2w-1647003940-0-ARQCHIIlRNU6tVQYWFNMsKUoL5m66+Fa914JqUxJrsa4ZGq8GZinoFYzuNcbCV+eHq77W61CGBI4yYSdS6AlQSPAK6mBaV8g==;_gat_UA-169731965-1=1AlQSPAK6mBaV8g==;_gat_UA-169731965-1=1`,
          },
        }
      );
      //if (statusCode) return reject(statusMessage);
      const $ = cheerio.load(data);
      let result = $("script#__NEXT_DATA__")
        .get()
        .map((m) => {
          let results;
          if (m && m.children && m.children[0] && m.children[0].data) {
            results = JSON.parse(m.children[0].data);
          } else results = {};
          return results;
        })[0];
      resolve(result);
    });
  }
  stalker(username) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "GET",
          url: `https://www.instagram.com/${username}/?__a=1`,
          headers: this.headers,
        })
        .then((anu) => {
          if (isAxiosError()) throw "axios error";
          const metaData = anu.data.graphql.user;
          const result = {
            username: metaData.username,
            full_name: metaData.full_name ? metaData.full_name : "-",
            biography: metaData.biography ? metaData.biography : "-",
            following: functions.h2k(metaData.edge_follow.count) + " Following",
            followers:
              functions.h2k(metaData.edge_followed_by.count) + " Followers",
            posts_count:
              functions.h2k(
                metaData.edge_owner_to_timeline_media.edges.map((x) => x.node)
                  .length
              ) + " Posts",
            external_url: metaData.external_url ? metaData.external_url : "-",
            is_private:
              metaData.is_private !== true ? "Not Private" : "Private Account",
            is_verified:
              metaData.is_verified !== true ? "Not Verified" : "Is Verified",
            profile_url: metaData.profile_pic_url_hd,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }

  tv(link) {
    return new Promise(async (resolve, reject) => {
      let config = {
        url: link,
        submit: "",
      };
      axios("https://downloadgram.org/igtv-downloader.php", {
        method: "POST",
        data: new URLSearchParams(Object.entries(config)),
        headers: {
          cookie:
            "_ga=GA1.2.623704211.1625264926; __gads=ID=a078e4fc2781b47b-22330cd520ca006e:T=1625264920:RT=1625264920:S=ALNI_MYS-jyPCjNa94DU8n-sX4aNF-ODOg; __atssc=google%3B3; _gid=GA1.2.1953813019.1625397379; __atuvc=4%7C26%2C6%7C27; __atuvs=60e2ab6d67a322ec003",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })
        .then((res) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(res.data);
          resolve({
            link: $("#downloadBox > a").attr("href"),
          });
        })
        .catch(reject);
    });
  }
  story(username) {
    return new Promise(async (resolve, reject) => {
      axios
        .request({
          url: "https://www.instagramsave.com/instagram-story-downloader.php",
          method: "GET",
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            cookie:
              "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
          },
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const token = $("#token").attr("value");
          let config = {
            headers: {
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              "sec-ch-ua":
                '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
              cookie:
                "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            data: `url=${
              encodeURIComponent("https://www.instagram.com/") + username
            }&action=story&token=${token}`,
          };
          axios
            .post(
              "https://www.instagramsave.com/system/action.php",
              config.data,
              {
                headers: config.headers,
              }
            )
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              resolve(data.medias);
            });
        })
        .catch(reject);
    });
  }
}
module.exports = { Instagram };
