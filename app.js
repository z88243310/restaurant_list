// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant') // 載入 restaurant model
const methodOverride = require('method-override')

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

// routes setting
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

app.get('/restaurants/create', (req, res) => {
  res.render('create')
})

app.post('/restaurants/create', (req, res) => {
  return Restaurant.create(req.body) // 存入資料庫
    .then(() => res.redirect('/')) // 回到首頁
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// queryString : search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  return Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch((error) => console.log(error))
  // { restaurants : restaurants , keyword : keyword } object literal extension
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})
