# 我的餐廳清單

我們提供了各式各樣的餐廳資訊及評價，讓想吃美食的您，隨時都能找到喜愛的餐廳，若滿意餐廳的服務，也邀請您給予餐廳小小的讚，祝您有個愉快的用餐時光。

網站建構使用 Node.js + Express + Express-handlebars + Boostrap + Font-awesome

## 頁面呈現
<p float="left">
<img src="https://github.com/z88243310/restaurant_list/blob/ba571204ee15e69fe25f0a85ba1c1cabc3c9921d/public/img/homePage.png" width="40%">
<img src="https://github.com/z88243310/restaurant_list/blob/ba571204ee15e69fe25f0a85ba1c1cabc3c9921d/public/img/restaurantInfo.png" width="40%">
</p>

## 功能描述
* 關鍵字搜尋
* 餐廳資料連結 Google Map

## 環境建置需求
* [Node.js](https://nodejs.org/en/)
* Terminal | CMD | [Git Bash](https://gitforwindows.org/)

## 安裝與執行步驟
* 打開終端機 cd 到指定路徑 ( 以 windows桌面 為例 )
```
cd C:\Users\'使用者名稱'\Desktop
```
* 下載 restaurant_list 專案到本地電腦上
```
git clone https://github.com/z88243310/restaurant_list.git
```
3. 進入 restaurant_list 路徑
```
cd restaurant_list
```
4. 在 restaurant_list 路徑中，依照 package-lock.json 安裝 Express、Express-handlebars 與其他必要套件
```
npm install
```
5. 執行專案 ( 伺服器啟動後會顯示 `The server is listening on http://localhost:3000` )
```
npm start
```
6. 開啟瀏覽器輸入網址 http://localhost:3000

## 開發工具版本
* Node.js 14.16.0
* Express 4.17.1
* Express-handlebars 5.3.4
* Boostrap 4.2.1 ( 含 popper 2.9.1 + jquery 3.3.1 )
* Font-awesome 5.13.0
