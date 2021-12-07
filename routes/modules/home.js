// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 引用 errorHandler model
const errorHandler = require('../../models/errorHandler')

// HomePage with queryString and category
router.get('/', (req, res) => {
  const userId = req.user._id
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
  // 在該使用者中，找出姓名及分類符合關鍵字的餐廳
  return Restaurant.find({ $and: [{ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] }, { userId }] })
    .lean()
    .sort(modeStatus)
    .then((restaurants) => res.render('index', { restaurants, keyword, modeSelected }))
    .catch((error) => errorHandler(error, res))
})

// 匯出路由模組
module.exports = router
