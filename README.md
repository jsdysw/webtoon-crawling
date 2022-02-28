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
* move to the /us-naver folder.


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

* step 1. login through puppeteer browser. (Not necessary)
* step 2. get all the webtoons list
<img width="831" alt="스크린샷 2022-02-28 오후 5 11 42" src="https://user-images.githubusercontent.com/76895949/155947503-8db79732-d94c-4849-8383-5e80722d6be2.png">
* step 3. move to the specific webtoon page and get more detailed information.
<img width="831" alt="스크린샷 2022-02-28 오후 5 12 11" src="https://user-images.githubusercontent.com/76895949/155947576-ad08ef3e-af2d-4ade-af88-a205cea06573.png">

### how to execute
* move to the /kor-naver folder

```javascript
npm install
```

* at /kor-naver/getOngoings.js write down your naver id/pw.
```javascript
const naverId = "NAVER_ID";
const naverPw = "NAVER_ID_PASSWORD";
```

* at /kor-naver/getFinished.js write down your naver id/pw.
```javascript
const naverId = "NAVER_ID";
const naverPw = "NAVER_ID_PASSWORD";
```

```javascript
npm start
```
* check korNaverFinished.json and korNaverOngoing.json files

# korea kakaopage webtoons
* kakaopage website get webtoons information from their server through api call.
* So I will get information the same way.

* step 1. get webtoon data from kakaopage server through api call.
  * (ongoing) https://api2-page.kakao.com/api/v2/store/day_of_week_top/list?category=10&subcategory=0&page= + [0,..,pageEndNum] + &day= + [1, 2, 3, 4, 5, 6, 7]
  * (finished) https://api2-page.kakao.com/api/v2/store/day_of_week_top/list?category=10&subcategory=0&page= + [0,..,pageEndNum] + &day= + [1, 2, 3, 4, 5, 6, 7]
* ![스크린샷 2022-02-28 오후 5 27 13](https://user-images.githubusercontent.com/76895949/155949695-ca70ab46-3902-44d1-9c09-89a14f6ad089.png)

* step 2. parser data.

### how to execute
* move to the /kor-kakaoPage folder.

```javascript
npm install
```

```javascript
npm start
```

* check the result, usNaver.json file.
