// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT

// 使用 session 加密
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

// get mongodb connection
require('./config/mongoose')

// handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// 使用 method-override 將 request 轉為 REETful 風格請求
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// flash message
app.use(flash())

// middleware to set isAuthenticated
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)

// routes setting

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`)
})
