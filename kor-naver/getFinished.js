const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");

const fs = require("fs");

const authorMapping = (content) => {
  content = content.replace(", ", " / ");
  content = content.replace(",", " / ");
  const array = content.replace(/^\s+|\s+$/gm, "").split(" / ");
  return array;
};

const getRequest = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const getSpecificInfo = async (page, array) => {
  let loading = 0;
  for (const item of array) {
    try {
      const res = await getRequest(item.url);
      const $ = cheerio.load(res.data);
      const $routeList = $(".title a");
      const $authorTag = $(".wrt_nm");
      const $genreTag = $(".genre");
      const $timeLastUploadList = $(".num");
      const $summaryList = $(".detail p");
  
      item.latestEpisodeUrl = "https://comic.naver.com" + ($routeList)[0].attribs.href;
      item.author = authorMapping($(($authorTag)).text());
      item.genre_kr = $genreTag.text();
      item.time_last_upload = new Date($(($timeLastUploadList)[0]).text());
      item.summary = $(($summaryList)[0]).text();
    } catch (error) {
      console.log(error);
      console.log("goto specific webtoon page failed");
    }

    if (loading%40 == 0) {
      console.log("Loading : " + loading/array.length*100 + "%");
    }
    loading++;
  }
  console.log("Loading : " + loading/array.length*100 + "%");
};

const getFinished = async () => {
  console.log("start crawling korea naver finished webtoons");

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  // login
  try {
    const naverId = "NAVER_ID";
    const naverPw = "NAVER_ID_PASSWORD";
    // move to the login page
    await page.goto("https://nid.naver.com/nidlogin.login");
    console.log("------> move to login page");
    // put id, pw 
    const document = "";
    await page.evaluate((id, pw) => {
      document.querySelector("#id").value = id;
      document.querySelector("#pw").value = pw;
    }, naverId, naverPw);
    // click login button
    await page.click(".btn_global");
    await page.waitForNavigation();
    console.log("------> login success");
  } catch {
    console.log("------> login failed");
  }

  const webtoon = [];
  await page.goto("https://comic.naver.com/webtoon/finish.nhn");

  const res = await page.content();
  const $ = cheerio.load(res); 
  const $routeList = $(".img_list div.thumb a"); // url
  const $titleList = $(".img_list div.thumb img"); // title
  const $ratingList = $("div.rating_type strong"); // rating
  
  for (let i = 0; i<$routeList.length; i++) {
    webtoon[i] = {
      title: ($titleList)[i].attribs.title,
      url: "https://comic.naver.com" + ($routeList)[i].attribs.href,
      thumb: ($titleList)[i].attribs.src,
      is_finished: true,
      rating: $($ratingList[i]).text(),
      author: "",
      latestEpisodeUrl: "",
      summary: "",
      genre_kr: "",
      time_last_upload: "",
    };
  }

  await getSpecificInfo(page, webtoon);
  await browser.close();
  
  var json = JSON.stringify(webtoon);
  fs.writeFile('./korNaverFinished.json',json, function(err) {
    if (err == null) {
      console.log("save success");
    } else {
      console.log("saving file failed");
    }
  });
};
module.exports = {
  getFinished,
};
