// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// HomePage with queryString and category
router.get('/', (req, res) => {
  console.log(req.query.keyword)
  const keyword = req.query.keyword ? req.query.keyword.toLowerCase().trim() : ''
  const modeSelected = req.query.modeSelected || 'A->Z'
  let modeStatus = ''
  switch (modeSelected) {
    case 'A->Z':
      modeStatus = { name: 'asc' }
      break
    case 'Z->A':
      modeStatus = { name: 'desc' }
      break
    case '類別':
      modeStatus = { category: 'asc' }
      break
    case '地區':
      modeStatus = { location: 'asc' }
      break
    default:
      modeStatus = { name: 'asc' }
      break
  }
  return Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .sort(modeStatus)
    .then((restaurants) => res.render('index', { restaurants, keyword, modeSelected }))
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router
