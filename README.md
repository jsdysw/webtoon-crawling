# webtoon-crawling
* framework : nodejs
* language : javascript
* used libraries : axios, cheerio, puppeteer

## us naver webtoons
* step 1.get all webtoons list
![스크린샷 2022-02-28 오후 4 53 20](https://user-images.githubusercontent.com/76895949/155945034-62db19f6-4361-4d01-b3e7-d98eba846dfe.png)

* step 2.move to specific webtoon page and get more detailed information.
![스크린샷 2022-02-28 오후 4 54 41](https://user-images.githubusercontent.com/76895949/155945202-ff9db125-304a-499f-9e3d-86c6037dc0a5.png)

### how to execute
* move to us-naver folder
* 
₩₩₩javascript
npm install
₩₩₩javascript

₩₩₩javascript
npm start
₩₩₩javascript

check the result, usNaver.json file

## kor naver
if you want to access information of adult webtoons. you have to pass website's authorization.
you can see how i implemented puppeteer browser login.


### how to execute
move to kor-naver folder
npm install

/kor-naver/getOngoings.js
// put id/pw information inline
const naverId = "NAVER_ID";
const naverPw = "NAVER_ID_PASSWORD";

/kor-naver/getFinished.js
// put id/pw information inline
const naverId = "NAVER_ID";
const naverPw = "NAVER_ID_PASSWORD";

npm start
check korNaverFinished.json and korNaverOngoing.json files


