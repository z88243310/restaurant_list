# 我的餐廳清單

我們提供了各式各樣的餐廳資訊及評價，讓想吃美食的您，隨時都能找到喜愛的餐廳，若滿意餐廳的服務，也邀請您給予餐廳小小的讚，祝您有個愉快的用餐時光。

網站建構使用 Node.js + Express + Express-handlebars + passport + bcryptjs + Boostrap + Font-awesome

## 頁面呈現

<p float="left"><img src="https://github.com/z88243310/restaurant_list/blob/main/public/img/homePage.png" width="49%">
<img src="https://github.com/z88243310/restaurant_list/blob/main/public/img/restaurantInfo.png" width="49%"></p>
<img src="https://github.com/z88243310/restaurant_list/blob/main/public/img/login-gif.gif" width="98.5%">

## 功能描述

登入

- 使用者註冊
- 第三方登入 - Facebook

資料顯示

- 關鍵字搜尋
- 排列方式

餐廳功能

- 顯示地圖資訊
- 新增餐廳資訊
- 查詢詳細資訊
- 編輯餐廳資訊
- 刪除餐廳資訊

## 環境建置需求

- [Node.js 14.16.0](https://nodejs.org/en/)
- Terminal | CMD | [Git Bash](https://gitforwindows.org/)
- [MongoDB 4.2.17](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.17-signed.msi)
- MongoDB 管理工具 ( [Robo 3T](https://robomongo.org/) )
- 第三方登入 ( [Facebook developer app](https://developers.facebook.com/apps) )
- .env 檔 ( 環境變數設定 )
- ( 非必要 ) 反向代理 - 外網進入本地 ( [ngrok](https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip) )

## 安裝與執行步驟

1.打開終端機 cd 到指定路徑 ( 以 windows 桌面 為例 )

```text
cd C:\Users\'使用者名稱'\Desktop
```

2.下載 restaurant_list 專案到本地電腦上

```text
git clone https://github.com/z88243310/restaurant_list.git
```

3.進入 restaurant_list 路徑

```text
cd restaurant_list
```

4.在 restaurant_list 路徑中，依照 package-lock.json 安裝 Express、Express-handlebars 與其他必要套件

```text
npm install
```

5.在 restaurant_list 路徑中，建立 .env 檔，設定環境變數

```text
// 必要
SESSION_SECRET="輸入任意加密字串"
MONGODB_URI=mongodb://localhost/restaurant-list
PORT=3000
```

6.製造種子資料 ( `須先確定 MongoDB 已啟動` )

```text
npm run seed
```

7.執行專案 ( 伺服器啟動後會顯示 `The server is listening on http://localhost:3000` )

```text
npm run start
```

8.開啟瀏覽器輸入網址 <http://localhost:3000>

9.使用測試帳號登入

user1

```text
email : user1@example.com
password : 12345678
```

user2

```text
email : user2@example.com
password : 12345678
```

10.使用第三方登入 ( 建立 Facebook developer app，並於 .env 加入環境變數 )

方法一：本地測試使用

1. 建立 [Facebook developer app](https://developers.facebook.com/apps)後，點選 developer app 左上方，再次建立測試應用程式
2. 並於 .env 加入環境變數

```text
FACEBOOK_ID="輸入 facebook test app ID"
FACEBOOK_SECRET="輸入 facebook test app SECRET"
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

方法二：部屬 heroku，或以外網進入 localhost 測試時使用

1. 建立 [Facebook developer app](https://developers.facebook.com/apps) 取得 ID 和 SECRET
2. 使用 [ngrok](https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip) 取得 https 本地外網網址

```text
// 選擇 - 第三方登入
FACEBOOK_ID="輸入 facebook app ID"
FACEBOOK_SECRET="輸入 facebook app SECRET"
FACEBOOK_CALLBACK="https 本地外網網址"/auth/facebook/callback
```

3. 加入環境變數後，於 [Facebook developer app](https://developers.facebook.com/apps) 設定中 <有效的 OAuth 重新導向 URI> 項目，也需輸入相同 FACEBOOK_CALLBACK 網址
4. [Facebook developer app](https://developers.facebook.com/apps) 權限與功能 > 開啟 public_profile 權限，即可正常運作

## 開發工具版本

程式軟體

- Node.js 14.16.0
- MongoDB 4.2.17
- Robo 3T 1.4

前端外觀

- Boostrap 4.2.1 ( 搭配 popper 2.9.1 + jquery 3.3.1 )
- Font-awesome 5.13.0

後端套件

- express 4.17.1
- express-handlebars 5.3.4
- express-session 1.17.2
- mongoose 6.0.12
- method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- dotenv 10.0.0
- passport 0.5.0
- passport-facebook 3.0.0
- passport-local 1.0.0

更新時間 : 2021.01.07
