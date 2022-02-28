# webtoon-crawling
* framework : nodejs
* language : javascript
* used libraries : axios, cheerio, puppeteer

# us naver webtoons
* step 1.get all the webtoons list
![스크린샷 2022-02-28 오후 4 53 20](https://user-images.githubusercontent.com/76895949/155945034-62db19f6-4361-4d01-b3e7-d98eba846dfe.png)

* step 2.move to the specific webtoon page and get more detailed information.
![스크린샷 2022-02-28 오후 4 54 41](https://user-images.githubusercontent.com/76895949/155945202-ff9db125-304a-499f-9e3d-86c6037dc0a5.png)

### how to execute
* move to the us-naver folder.


```javascript
npm install
```

```javascript
npm start
```

* check the result, usNaver.json file.

# korea naver webtoons
* if you want to access information of adult webtoons. you have to pass website's authorization.
* you can see how puppeteer browser login was implemented.

### ongoing webtoons
* step 1. login through puppeteer browser. (Not necessary)
* step 2. get all the webtoons list
<img width="831" alt="스크린샷 2022-02-28 오후 5 11 42" src="https://user-images.githubusercontent.com/76895949/155947503-8db79732-d94c-4849-8383-5e80722d6be2.png">
* step 3. move to the specific webtoon page and get more detailed information.
<img width="831" alt="스크린샷 2022-02-28 오후 5 12 11" src="https://user-images.githubusercontent.com/76895949/155947576-ad08ef3e-af2d-4ade-af88-a205cea06573.png">

### completed(finished) webtoons
*step 1. login through puppeteer browser. (Not necessary)

* step 2. get all the webtoons list
<img width="831" alt="스크린샷 2022-02-28 오후 5 13 05" src="https://user-images.githubusercontent.com/76895949/155947696-900d007b-8c62-4d2f-ad7b-b3cedc82ae3b.png">

* step 3. move to the specific webtoon page and get more detailed information.
* <img width="836" alt="스크린샷 2022-02-28 오후 3 34 17" src="https://user-images.githubusercontent.com/76895949/155946395-7c2955c8-80e1-4eaa-a73e-abe30e34f626.png">

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


