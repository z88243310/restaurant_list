// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// HomePage
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// queryString : search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  return Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch((error) => console.log(error))
  // { restaurants : restaurants , keyword : keyword } object literal extension
})

// 匯出路由模組
module.exports = router
