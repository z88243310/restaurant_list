// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()
const port = 3000

// get mongodb connection
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// 使用 method-override 將 request 轉為 REETful 風格請求
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// routes setting




// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
