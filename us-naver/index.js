const cheerio = require('cheerio');
const axios = require('axios');

const fs = require("fs");

let arr = [];

const getRequest = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
  const body = await getRequest("https://www.webtoons.com/en/dailySchedule");
  const $ = cheerio.load(body.data);
    
  $("ul.daily_card li").each(function (i, element) {
    let wt = {
      'title': '',
      'thumb': '',
      'link': '',
      'author': '',
      'genre': '',
      'summary': '',
      'starScore':'',
    }
    wt.title = String($(this).find('p.subj').text());
    wt.thumb = String($(this).find('img').attr("src"));
    wt.link = String($(this).find('a').attr("href"));
    wt.author = String($(this).find('p.author').text());
    wt.genre = String($(this).find('p').eq(0).text());
    arr.push(wt);
  });

  let loading = 0;
  for (const element of arr) {
    const body = await getRequest(element.link);
    const $ = cheerio.load(body.data);
    element.summary = String($("#_asideDetail").find('p.summary').text());
    element.starScore = String($("#_starScoreAverage").text());
    element.day = String($("p.day_info").text());

    loading++;
    if (loading%50 == 0) {
      console.log(`loading ${loading/arr.length * 100}%.`);
    }
  }
}

const getUSNaverWebtoons = async () => {
  console.log('crawling start');
  await getData();
  console.log('crawling end');

  var usNaverjson = JSON.stringify(arr);
  fs.writeFile('./usNaver.json',usNaverjson, function(err) {
    if (err == null) {
      console.log("save success");
    } else {
      console.log("saving file failed");
    }
  });
}

getUSNaverWebtoons();