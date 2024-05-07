const { default: axios, isAxiosError } = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data");
const headers = require("../library/settings");
const fakeUa = require("../controller/fakeUa");

class Tools {
  constructor() {}
  bibbleDays() {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("https://www.bible.com/id/verse-of-the-day")
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios Error";
          const $ = cheerio.load(data);
          const title = $("amp-img.br2.img-wrap").attr("alt");
          const date = $("p.f5.fw4.yv-gray25.mt0.mb0").text();
          const thumbnail =
            "https://" +
            $("amp-img.br2.img-wrap").attr("src").split("https://")[1];
          const url =
            "https://www.bible.com" +
            $("div.relative.img-wrap > a").attr("href");
          const ayat = $("p.yv-gray50.mt0.mb2").text();
          resolve({
            title,
            date,
            thumbnail,
            url,
            ayat,
          });
        })
        .catch(reject);
    });
  }
  async distance(from, to) {
    let getFrom = await axios.get("http://id.toponavi.com/searchcity1/" + from);
    let getTo = await axios.get("http://id.toponavi.com/searchcity1/" + to);
    const execFrom =
      /onclick='addValue1\(this.getAttribute\("rel"\), "(.*?)"\)'/.exec(
        getFrom.data
      )[1];
    const execTo =
      /onclick='addValue1\(this.getAttribute\("rel"\), "(.*?)"\)'/.exec(
        getTo.data
      )[1];
    const url = "http://id.toponavi.com/" + execFrom + "-" + execTo;
    let result = {};
    try {
      const getDistance = await axios.request({
        method: "GET",
        url,
        timeout: 5000,
        withCredentials: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          Referer: url,
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        },
      });
      if (isAxiosError()) throw "Axios error";
      const $ = cheerio.load(getDistance.data);
      const getInformation = $("div.tn_info_text").text();
      result.distance =
        /koordinat — (.*?)mil./g.exec(getInformation)[1] + "mil";
      result.description = getInformation.trim().replace(/\t/g, "");
    } catch (error) {
      throw error;
    }
    return result;
  }
  sfileDown(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(url)
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios error";
          let $ = cheerio.load(data);
          let title = /<b>(.*?)<\/b>/g.exec(data)[1].trim();
          let mimetype = $("div.list").eq(0).text().split(" - ")[1];
          let owner = $("div.list:nth-child(4) > a:nth-child(2)").text();
          let uploaded = $("div.list").eq(2).text().split(":")[1].trim();
          let downloads = $("div.list").eq(3).text().split(":")[1].trim();
          let size = $("div.list").eq(5).find("a").text().split(/\(|\)/g)[1];
          let link = $("div.list").eq(5).find("a").attr("href");
          let result = {
            title,
            owner,
            mimetype,
            uploaded,
            downloads,
            size,
            url: link,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  sfileSearch(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://sfile.mobi/search.php?q=${query}&search=Search`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.w3-card.white > div.list")
            .get()
            .map((m) => {
              let url = $(m).find("a").attr("href");
              let title = $(m).find("a").text().trim();
              let size = $(m).text().split(/\(|\)/g)[1];
              result.push({
                title,
                url,
                size,
              });
            });
          resolve(result.filter((a) => a.url !== undefined));
        })
        .catch(reject);
    });
  }
  apkmirror(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          "https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=" +
            query
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios error";
          const $ = cheerio.load(data);
          let title = new Array();
          let developer = new Array();
          let update = new Array();
          let size = new Array();
          let downCount = new Array();
          let version = new Array();
          let url = new Array();
          let result = new Array();
          $("div#content > div > div > div.appRow > div > div").each(function (
            a,
            b
          ) {
            let judul = $(this).find("div > h5 > a").text();
            let dev = $(this).find("div > a").text().replace(/\n/g, "");
            let link = $(this)
              .find("div > div.downloadIconPositioning > a")
              .attr("href");
            if (judul !== "") title.push(judul);
            if (dev !== "") developer.push(dev);
            if (link !== undefined) url.push(link);
          });
          $(
            "div#content > div > div > div.infoSlide > p > span.infoSlide-value"
          ).each(function (c, d) {
            let serialize = $(this).text();
            if (serialize.match("MB")) {
              size.push(serialize.trim());
            } else if (serialize.match("UTC")) {
              update.push(serialize.trim());
            } else if (!isNaN(serialize) || serialize.match(",")) {
              downCount.push(serialize.trim());
            } else {
              version.push(serialize.trim());
            }
          });
          for (let i = 0; i < url.length; i++) {
            result.push({
              title: title[i],
              developer: developer[i],
              version: version[i],
              updated: update[i],
              downloadCount: downCount[i] || "1,000",
              size: size[i],
              url: "https://www.apkmirror.com" + url[i],
            });
          }
          resolve(result);
        })
        .catch(reject);
    });
  }
  async randomGoore() {
    const getData = await axios.get(
      "https://deepgoretube.site/page/" + Math.floor(Math.random() * 5)
    );
    if (isAxiosError()) throw "Axios error";
    const $ = cheerio.load(getData.data);
    let data = new Array();
    $("body > section.btp_inner_page > div > div > div > div > div").each(
      function (a, b) {
        const thumbnail = $(this).find("img.btp_post_card__img").attr("src");
        const title = $(this).find("img.btp_post_card__img").attr("alt");
        const quality = $(this)
          .find("div.card-img-overlay > div:nth-child(1)")
          .text()
          .split(/\n| /g)
          .join("");
        const duration = $(this)
          .find("div.card-img-overlay > div:nth-child(2)")
          .text()
          .split(/\n| /g)
          .join("");
        const url = $(this).find("a.btp_post_card__title").attr("href");
        const authorname = $(this)
          .find("a.btp_post_card__author > span.btp_post_card__author_text")
          .text()
          .split(/\n| /g)
          .join("");
        const author_url = $(this).find("a.btp_post_card__author").attr("href");
        const published = $(this)
          .find("small.mr-2")
          .text()
          .split(/\n/g)
          .join("")
          .trim();
        data.push({
          title,
          authorname,
          author_url,
          published,
          quality,
          duration,
          thumbnail,
          url,
        });
      }
    );
    return data;
  }
  async getGoore(link) {
    if (!/https?:\/\/deepgoretube\.site\/[A-Za-z0-9-_]+/.test(link))
      throw "invalid url";
    const getData = await axios.get(link);
    if (isAxiosError()) throw "Axios error";
    const $ = cheerio.load(getData.data);
    const getVideo = /'encrypt:(.*?)'/g.exec(getData.data)[1];
    const metadata = $("script.yoast-schema-graph")
      .get()
      .map((a) => {
        let response;
        if (a && a.children && a.children[0] && a.children[0].data) {
          response = JSON.parse(a.children[0].data);
        } else response = {};
        return response;
      })[0]["@graph"];
    let title = metadata[3].name;
    let author = metadata[6].name;
    let likes =
      $("span.wp_ulike_counter_up")
        .attr("data-ulike-counter-value")
        .split("+")
        .join("") + " like";
    let dislikes =
      $("span.wp_ulike_counter_down").attr("data-ulike-counter-value") +
      " dislike";
    let comments = metadata[5].commentCount.toString() + " comments";
    let description = metadata[6].description || "no description";
    let keyword = metadata[5].keywords.join("\n");
    let article = metadata[5].articleSection.join("\n");
    let published = $("p.btp_single_post_entry > span").text();
    let thumbnail = metadata[5].thumbnailUrl;
    let url = Buffer.from(getVideo, "base64").toString();
    return {
      source: "https://deepgoretube.site",
      title,
      author,
      published,
      likes,
      dislikes,
      comments,
      article,
      keyword,
      description,
      thumbnail,
      url,
    };
  }
  recipes(query) {
    return new Promise(async (resolve, reject) => {
      let getUrl = await axios.get("https://resepkoki.id/?s=" + query);
      if (isAxiosError()) throw "axios error";
      const $ = cheerio.load(getUrl.data);
      let link = new Array();
      $(
        "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a"
      ).each(function (a, b) {
        link.push($(b).attr("href"));
      });
      const randomLink = link[Math.floor(Math.random() * link.length)];
      await axios
        .get(randomLink)
        .then(async ({ data }) => {
          if (isAxiosError()) throw Error("error get Data");
          const $ = cheerio.load(data);
          let bahan = new Array();
          let takaran = new Array();
          let tahap = new Array();
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name"
          ).each(function (a, b) {
            bahan.push($(b).text());
          });
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount"
          ).each(function (c, d) {
            takaran.push($(d).text());
          });
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p"
          ).each(function (e, f) {
            tahap.push($(f).text());
          });
          const title = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1"
          ).text();
          const timer = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span"
          ).text();
          const portion = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span"
          )
            .text()
            .split(": ")[1];
          const level = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span"
          )
            .text()
            .split(": ")[1];
          const thumbnail = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img"
          )
            .attr("src")
            .split("?")[0];
          let Ingredient = "";
          for (let i = 0; i < bahan.length; i++) {
            Ingredient += bahan[i] + " " + takaran[i] + "\n";
          }
          let Tahap = "";
          for (let i = 0; i < tahap.length; i++) {
            Tahap += tahap[i] + "\n";
          }
          if (!(portion && level && thumbnail && Tahap))
            throw "result undefined";
          const result = {
            title,
            timer,
            portion,
            level,
            thumbnail,
            ingredient: Ingredient,
            step: Tahap,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  detectSong(buffer) {
    return new Promise(async (resolve, reject) => {
      if (typeof buffer !== "object") return reject({ status: false });
      const bodyForm = new formData();
      bodyForm.append("audio", buffer);
      axios
        .request({
          url: "https://tebaklagu-api.herokuapp.com/",
          method: "POST",
          data: bodyForm,
          headers: {
            ...bodyForm.getHeaders(),
          },
        })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          if (data[1] && data[1].track) {
            resolve({
              subject: data[1].track.share.subject || "no subject",
              title: data[1].track.share.title || "no know",
              singing: data[1].track.share.subtitle,
              released: data[1].track.sections[0].metadata[2].text,
              genre: data[1].track.genres.primary,
              thumbnail: data[1].track.images.coverart,
              url: data[1].track.hub.actions[1].uri,
            });
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }
  removebg(buffer) {
    return new Promise(async (resolve, reject) => {
      const formDataAppend = new formData();
      const filename = Date.now() + ".jpg";
      formDataAppend.append("dp_bucket", "bgRemover");
      formDataAppend.append("dp_files[]", buffer, filename);
      await axios({
        method: "POST",
        url: "https://uploader.depositphotos.com/upload/saveFiles",
        data: formDataAppend,
        headers: {
          ...formDataAppend.getHeaders(),
        },
      })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const requests = [
            {
              hash: "h2109759328",
              query: {
                dp_command: "bgRemover.processImage",
                dp_image_url: data.data.urls[0],
                dp_image_name: filename,
              },
            },
          ];
          await axios({
            method: "POST",
            url: "https://id.depositphotos.com/api",
            data: requests,
          })
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              resolve(data["h2109759328"].data.processed_image);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  text2speach(text, language) {
    return new Promise(async (resolve, reject) => {
      let twoLG;
      if (language === "en") twoLG = "US";
      else twoLG = language.toUpperCase();
      await axios
        .request({
          method: "POST",
          url: "https://api.soundoftext.com/sounds",
          data: {
            engine: "Google",
            data: { text: text, voice: language + "-" + twoLG },
          },
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          },
        })
        .then(async (response) => {
          if (isAxiosError()) throw "axios error";
          const getData = await axios.get(
            `https://api.soundoftext.com/sounds/${response.data.id}`
          );
          if (isAxiosError()) throw "axios error";
          if (!getData.data.location) resolve(getData.data.location);
          else reject("data undefined");
        })
        .catch(console.error);
    });
  }

  cerpen(url) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "GET",
          url: url,
        })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let results = new Array();
          $("div#content")
            .find("article.post")
            .each(function (a, b) {
              results.push($(this).find("h2 > a").attr("href"));
            });
          const randomUrl = results[Math.floor(Math.random() * results.length)];
          await axios
            .request({
              method: "GET",
              url: randomUrl,
            })
            .then(async ({ data }) => {
              if (isAxiosError()) throw "axios error";
              const _ = cheerio.load(data);
              let resultStory = new Array();
              _("div#content > article > p").each(function (a, b) {
                resultStory.push($(this).text().trim() || null);
              });
              resolve({
                title: _("div#content > article > h1").text(),
                author_url: _("div#content > article > a").attr("href"),
                author_name: _("div#content > article > a").eq(0).text(),
                story: resultStory.join(""),
              });
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  async pinterest(query) {
    let HASIL = new Array();
    await axios
      .request(`https://id.pinterest.com/search/pins/?rs=typed&q=` + query, {
        method: "GET",
        url: "https://id.pinterest.com/search/pins/?rs=typed&q=" + query,
        headers: headers.pin_headers,
      })
      .then((res) => {
        if (isAxiosError()) throw "axios error";
        const $ = cheerio.load(res.data);
        let hasil = new Array();
        $(
          "body > div > div > div > div > div > div > div > div > div > div > div"
        ).each(function (a, b) {
          $(b)
            .find("div")
            .each(function (c, d) {
              let Link = $(d)
                .find("div > div > div > div > a")
                .find("img")
                .attr("src");
              hasil.push(Link);
            });
        });
        let Data = new Array();
        hasil.map((V) => {
          if (V === undefined) return;
          Data.push(V.replace("236x", "originals"));
        });
        let FilterArray = new Set(Data);
        let unique = [...FilterArray];
        const result = {
          status: res.status,
          author: "I`am Ra",
          result: unique,
        };
        HASIL.push(result);
      });
    return HASIL[0];
  }
  linkwa(nama) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          "http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" +
            nama +
            "&searchby=name"
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          const result = new Array();
          const lnk = new Array();
          const nm = new Array();
          $("div.wa-chat-title-container").each(function (a, b) {
            const limk = $(b).find("a").attr("href");
            lnk.push(limk);
          });
          $("div.wa-chat-title-text").each(function (c, d) {
            const name = $(d).text();
            nm.push(name);
          });
          for (let i = 0; i < lnk.length; i++) {
            result.push({
              nama: nm[i].split(". ")[1],
              link: lnk[i].split("?")[0],
            });
          }
          resolve(result);
        })
        .catch(reject);
    });
  }

  gore() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://seegore.com/gore/")
        .then((anu) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(anu.data);
          let ini = new Array();
          $("figure.media").each(function (a, b) {
            ini.push($(this).find("a").attr("href"));
          });
          const random = ini[Math.floor(Math.random() * ini.length)];
          axios.get(random).then((result) => {
            if (isAxiosError()) throw "axios error";
            const _ = cheerio.load(result.data);
            const hasilnya = _("source[type='video/mp4']").attr("src");
            resolve(hasilnya);
          });
        })
        .catch(reject);
    });
  }

  musixmatch(query) {
    return new Promise(async (resolve, reject) => {
      var head = {
        "user-agent":
          "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        cookie:
          '_ga=GA1.2.441416655.1634297437;mxm_bab=AA;translate_lang=%7B%22key%22%3A%22en%22%2C%22name%22%3A%22English%22%7D;musixmatchUserGuid=52e1d4e2-d43b-4967-8e59-1ef509587670;_fbp=fb.1.1634297482993.1340831124;__gads=ID=0ccb6c42e7f8313c:T=1634297495:S=ALNI_MZayOdokwd1yBB_nvZsZyeSipObRA;OB-USER-TOKEN=c2924a56-8a80-43c4-9a07-1c5436f81df1;cto_bundle=HN5V619DYzElMkYwcHg5TTBHZ1A3aVBrVGE0dm1IQ0JjSElBNlJLZHZnUnRmajBkTHJzZFlDJTJCeEhZNXFLdXhDd0lzSk1iYUdhelpGWiUyRmhTcGhFeUtsUm9kc2sxcmNObmxnWXhNSlNTWndlandzME9qUW5RejBkeU1wODN1dGdUNU9Camh3ZkxIblJOZWRRMXZ3VXZWN2Zpd1k1bVElM0QlM0Q;_gid=GA1.2.1759477921.1634405633;FCCDCF=[null,null,["[[],[],[],[],null,null,true]",1634405633077],null];FCNEC=[["AKsRol-gRsxKEL-RmoS4K6so7IKZfHZKJHy7Woat0wLwYrsww6PoSZro61n7_XLCNN2V5Rp7oJ-Lp6jrmIKJ4XigsgEBL82KOVvdKa0IwzpwLNSUwnenmJPufFoFpY5lE482Yyrr43YLfRDVngc2q4WtOnLdBJqa_g=="]]',
      };
      await axios
        .request({
          method: "GET",
          url: `https://www.musixmatch.com/search/${encodeURIComponent(query)}`,
          headers: head,
        })
        .then(async (anu) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(anu.data);
          const urlnya =
            "https://www.musixmatch.com" +
            $("meta[itemProp='url']").attr("content");
          let resulter = new Array();
          await axios
            .request({
              method: "get",
              url: urlnya,
              headers: head,
            })
            .then((result) => {
              if (isAxiosError()) throw "axios error";
              const _ = cheerio.load(result.data);
              let parse;
              for (let aw of _("script").eq(5).get()) {
                const json = aw.children[0].data;
                parse = JSON.parse(json);
              }
              const resulter = {
                url: parse.mainEntityOfPage,
                title: parse.headline,
                thumb: parse.thumbnailUrl,
                lyrics: _("p.mxm-lyrics__content > span").text().trim(),
              };
              resolve(resulter);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  chord(query) {
    return new Promise(async (resolve, reject) => {
      const head = {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        Cookie:
          "__gads=ID=4513c7600f23e1b2-22b06ccbebcc00d1:T=1635371139:RT=1635371139:S=ALNI_MYShBeii6AFkeysWDKiD3RyJ1106Q; _ga=GA1.2.409783375.1635371138; _gid=GA1.2.1157186793.1635371140; _fbp=fb.1.1635371147163.1785445876",
      };
      let { data } = await axios.request({
        method: "GET",
        url: `http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search=${query}`,
        headers: head,
      });
      if (isAxiosError()) throw "axios error";
      await axios
        .get(
          `http://app.chordindonesia.com/?json=get_post&id=${data.posts[0].id}`,
          {
            headers: head,
          }
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data.post.content);
          resolve({
            title: $("img").attr("alt"),
            chord: $("pre").text().trim(),
          });
        })
        .catch(reject);
    });
  }

  async coinMarket() {
    try {
      // Get data
      const { data } = await axios.request({
        method: "GET",
        url: "https://coinmarketcap.com/?__cf_chl_jschl_tk__=pmd_XWRpX5wNzmTkeEjq8JcUikH2_LEp7wuGd3p90hV3rV0-1635425057-0-gqNtZGzNAhCjcnBszQl9",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          referer: "https://coinmarketcap.com/",
          Cookie:
            "gtm_session_first=%222021-10-28T12%3A37%3A59.841Z%22;sajssdk_2015_cross_new_user=1;sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217cc6e83fd1db-07af7f2237a5c7-70064242-389232-17cc6e83fd356%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217cc6e83fd1db-07af7f2237a5c7-70064242-389232-17cc6e83fd356%22%7D;_ga=GA1.2.1604447238.1635424691;_gid=GA1.2.1760742689.1635424691;cf_clearance=IX5M7TViXFlRHc6RuQ_R5r_SmYtxiVsLzP7rYcYZdlA-1635425063-0-150;_fbp=fb.1.1635425071008.1187209220;gtm_session_last=%222021-10-28T12%3A44%3A39.528Z%22;_hjid=b1db0c71-16c6-4833-949f-bb59e2491874;_hjFirstSeen=1;_hjIncludedInSessionSample=1;_hjAbsoluteSessionInProgress=0;_dc_gtm_UA-40475998-1=1",
        },
      });
      if (isAxiosError()) throw "axios error";
      const $ = cheerio.load(data);
      const keys = [
        "rank",
        "name",
        "price",
        "24h",
        "7d",
        "marketCap",
        "volume",
        "circulatingSupply",
      ];
      const coinArr = new Array();
      $(".h7vnx2-2 > tbody:nth-child(3) > tr").each((a, b) => {
        let hm = 0;
        const coin = {};
        if (a <= 9) {
          $(b)
            .children()
            .each((c, d) => {
              let anu = $(d).text();
              if (hm === 1 || hm === 6) {
                anu = $("p:first-child", $(d).html()).text();
              }
              if (anu) {
                coin[keys[hm]] = anu;
                hm++;
              }
            });
          coinArr.push(coin);
        }
      });
      return coinArr;
    } catch (err) {
      console.error(err);
    }
  }
  imageSearch(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://images.search.yahoo.com/search/images;_ylt=Awr9F68TYZlhbvoAGsWLuLkF;_ylc=X1MDOTYwNTc0ODMEX3IDMgRmcgMEZ3ByaWQDNjJIOTFIZjBUYkNuek4xendqT09BQQRuX3N1Z2cDNQRvcmlnaW4DaW1hZ2VzLnNlYXJjaC55YWhvby5jb20EcG9zAzAEcHFzdHIDBHBxc3RybAMEcXN0cmwDNwRxdWVyeQNzb2xlaG90BHRfc3RtcAMxNjM3NDQyMDc1?fr2=sb-top-images.search&p=${encodeURIComponent(
            query
          )}&ei=UTF-8&fr=sfp&bucket=&exclusive_bucket=`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.sres-cntr").each(function (a, b) {
            $(this)
              .find("ul#sres > li")
              .each(function (c, d) {
                result.push({
                  title: JSON.parse($(this).attr("data")).alt,
                  size: JSON.parse($(this).attr("data")).s,
                  width: JSON.parse($(this).attr("data")).w,
                  height: JSON.parse($(this).attr("data")).h,
                  url: JSON.parse($(this).attr("data")).iurl,
                });
              });
          });
          resolve(result);
        })
        .catch(reject);
    });
  }

  dorking(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "GET",
          url: `https://www.google.com/search?q=${encodeURIComponent(
            query
          )}&oq=${encodeURIComponent(
            query
          )}&aqs=chrome..69i57j69i58.749j0j4&ie=UTF-8`,
          headers: {
            "User-Agent": fakeUa(),
          },
        })
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data);
          let result = new Array();
          $("div#rso > div").each(function (a, b) {
            result.push($(this).find("div > div > div > a").attr("href"));
          });
          resolve(result.filter((a) => a !== undefined));
        })
        .catch(reject);
    });
  }
  wikipedia(query) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `https://id.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${encodeURIComponent(
            query
          )}`
        )
        .then(async ({ data }) => {
          if (isAxiosError()) throw "axios error";
          const getId = data.query.search[0].pageid;
          await axios
            .get(`https://id.wikipedia.org/?curid=${getId}`)
            .then(({ data }) => {
              if (isAxiosError()) throw "axios error";
              const $ = cheerio.load(data);
              let script = $("script[type='application/ld+json']").get();
              let json;
              for (let anu of script) {
                json = JSON.parse(anu.children[0].data);
              }
              const result = $("table.infobox").next().text().trim();
              const resultt = {
                title: json.headline || query,
                url: json.url,
                publisher: json.publisher.name,
                datePublished: json.datePublished,
                thumbnail: json.image || json.publisher.logo.url,
                context: result,
              };
              resolve(resultt);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }
  cekCC(data) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          method: "POST",
          url: "http://ke1.nl/en/checker/api.php",
          data: `data=${encodeURIComponent(data)}`,
        })
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          const $ = cheerio.load(data.msg);
          resolve(
            $("div").text().split("@")[0] ||
              "Check the validity of a credit card"
          );
        })
        .catch(reject);
    });
  }

  twtstalk(user) {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("https://instalker.org/" + user)
        .then(({ data }) => {
          if (isAxiosError()) throw "axios error";
          let $ = cheerio.load(data);
          let tweets = new Array();
          $("div.activity-posts").each(function (a, b) {
            tweets.push({
              author: {
                username: $(b).find("div.user-text3 > h4 > span").text(),
                nickname:
                  $(b).find("div.user-text3 > h4").text().split("@")[0] ||
                  $(b).find("div.user-text3 > h4").text().trim(),
                profile_pic:
                  $(b).find("img").attr("src") ||
                  $(b).find("img").attr("onerror"),
                upload_at: $(b).find("div.user-text3 > span").text(),
              },
              title: $(b).find("div.activity-descp > p").text() || "",
              media:
                $(b).find("div.activity-descp > div > a").attr("href") ||
                $(b).find("div.activity-descp > p > video").attr("src") ||
                $(b).find("div.activity-descp > div > a > img").attr("src") ||
                $(b).find("div.activity-descp > div > a > video").attr("src") ||
                "No Media Upload",
              retweet: $(b)
                .find("div.like-comment-view > div > a:nth-child(1) > span")
                .text()
                .replace("Download Image", ""),
              likes: $(b)
                .find("div.like-comment-view > div > a:nth-child(2) > span")
                .text(),
            });
          });
          let hasil = {
            username: $(
              "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3 > span"
            ).text(),
            nickname:
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3"
              )
                .text()
                .split("@")[0] ||
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3"
              ).text(),
            background: $(
              "body > main > div.dash-todo-thumbnail-area1 > div.todo-thumb1.dash-bg-image1.dash-bg-overlay"
            )
              .attr("style")
              .split("url(")[1]
              .split(")")[0],
            profile:
              $(
                "body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a > img"
              ).attr("src") ||
              $(
                "body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a"
              ).attr("href"),
            biography:
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(2)"
              ).text() || "",
            join_at:
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(3)"
              ).text() ||
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(5)"
              ).text(),
            location:
              $(
                "body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(4)"
              ).text() || "",
            tweets_count: $(
              "body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > div.dscun-numbr"
            ).text(),
            followers: $(
              "body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(2) > div > div.dscun-numbr"
            ).text(),
            following: $(
              "body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(3) > div > div.dscun-numbr"
            ).text(),
            media_count: tweets.length,
            media: tweets || "No Media Upload",
          };
          resolve(hasil);
        })
        .catch(reject);
    });
  }
}

module.exports = { Tools };
