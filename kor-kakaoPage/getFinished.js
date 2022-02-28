const axios = require("axios");
const fs = require("fs");

const getRequest = async (url) => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const getWebtoonInfo = async (webtoon, url) => {
  const res = await getRequest(url);
  const webtoonObj = res.data.list
  ;
  let webtoonIdx = webtoon.length;
  for (let i = 0; i<webtoonObj.length; i++, webtoonIdx++) {
    webtoon[webtoonIdx] = {
      series_id: webtoonObj[i].series_id,
      title: webtoonObj[i].title,
      finished: true,
      summary: webtoonObj[i].description || ebtoonObj[i].caption,
      author: webtoonObj[i].author,
      age_grade: webtoonObj[i].age_grade,
      genre_kr: webtoonObj[i].sub_category_title,
      rating: webtoonObj[i].rating,
      time_last_upload: new Date(webtoonObj[i].last_slide_added_date),
      url: "https://page.kakao.com/home?seriesId=" + webtoonObj[i].series_id,
      thumb: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].thumb_img,
      thumb2: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].image,
      thumb3: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].land_thumb_img,
      pubperiod: webtoonObj[i].pubperiod,
    };
  }
  return res.data.is_end;
};
const getFinished = async () => {
  const webtoon = [];
  const kakaoUrl = "https://api2-page.kakao.com/api/v2/store/day_of_week_top/list?category=10&subcategory=0&page=";
  let pagesLimit = false;
  for (let page = 0; !pagesLimit; page++) {
    pagesLimit = await getWebtoonInfo(webtoon, kakaoUrl + page + "&day=12");
    console.log("page " + page + " : success");
  }
  console.log("page end");

  var json = JSON.stringify(webtoon);
  fs.writeFile('./korKakaoPageFinished.json',json, function(err) {
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