# 我的餐廳清單

我們提供了各式各樣的餐廳資訊及評價，讓想吃美食的您，隨時都能找到喜愛的餐廳，若滿意餐廳的服務，也邀請您給予餐廳小小的讚，祝您有個愉快的用餐時光。

網站建構使用 Node.js + Express + Express-handlebars + Boostrap + Font-awesome

## 頁面呈現

<p float="left"><img src="https://raw.githubusercontent.com/z88243310/restaurant_list/main/public/img/homePage.png" width="40%">
<img src="https://raw.githubusercontent.com/z88243310/restaurant_list/main/public/img/restaurantInfo.png" width="40%"></p>

## 功能描述

- 餐廳縮圖陳列
- 關鍵字搜尋
- 餐廳資料連結 Google Map

## 環境建置需求

- [Node.js](https://nodejs.org/en/)
- Terminal | CMD | [Git Bash](https://gitforwindows.org/)
- MongoDB 管理工具 ( [Robo 3T](https://robomongo.org/) )

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

5.製造種子資料 ( `須先確定 MongoDB 已啟動` )

```text
npm run seed
```

6.執行專案 ( 伺服器啟動後會顯示 `The server is listening on http://localhost:3000` )

```text
npm run start
```

7.開啟瀏覽器輸入網址 <http://localhost:3000>

## 開發工具版本

- Node.js 14.16.0
- Express 4.17.1
- Express-handlebars 5.3.4
- Boostrap 4.2.1 ( 搭配 popper 2.9.1 + jquery 3.3.1 )
- Font-awesome 5.13.0
- Mongoose 6.0.12
- Robo 3T 1.4
