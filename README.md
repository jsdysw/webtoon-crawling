# webtoon-crawling

## us naver webtoons

### how to execute
move to us-naver folder
npm install
npm start
check usNaver.json file

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


