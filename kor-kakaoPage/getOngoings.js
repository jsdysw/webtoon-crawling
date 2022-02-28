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
  const webtoonObj = res.data.list;

  let webtoonIdx = webtoon.length;
  for (let i = 0; i<webtoonObj.length; i++, webtoonIdx++) {
    webtoon[webtoonIdx] = {
      series_id: webtoonObj[i].series_id,
      title: webtoonObj[i].title,
      finished: false,
      summary: webtoonObj[i].description || webtoonObj[i].caption,
      author: webtoonObj[i].author,
      age_grade: webtoonObj[i].age_grade,
      genre_kr: webtoonObj[i].sub_category_title,
      rating: webtoonObj[i].rating,
      time_last_upload: new Date(webtoonObj[i].last_slide_added_date),
      url: "https://page.kakao.com/home?seriesId=" + webtoonObj[i].series_id,
      poster: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].thumb_img,
      thumb: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].image,
      thumb2: "https://dn-img-page.kakao.com/download/resource?kid=" + webtoonObj[i].land_thumb_img,
      pubperiod: webtoonObj[i].pubperiod,
    };
  }
  return res.data.is_end;
};
const getOngoings = async () => {
  const webtoon = [];
  const days = [1, 2, 3, 4, 5, 6, 7];
  const daumUrl = "https://api2-page.kakao.com/api/v2/store/day_of_week_top/list?category=10&subcategory=0&page=";
  for ( const day of days ) {
    let pagesLimit = false;
    for ( let page = 0; !pagesLimit; page++ ) {
      pagesLimit = await getWebtoonInfo(webtoon, daumUrl+page+"&day="+day);
    }
    // ---> log for debugging
    console.log(day + " finished");
  }

  var json = JSON.stringify(webtoon);
  fs.writeFile('./korKakaoPageOngoing.json',json, function(err) {
    if (err == null) {
      console.log("save success");
    } else {
      console.log("saving file failed");
    }
  });
};
module.exports = {
  getOngoings,
};