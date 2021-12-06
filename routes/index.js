const express = require('express')
const router = express.Router()

// 引入 home 模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/users', users)
router.use('/restaurants', restaurants)
router.use('/', home)

//匯出路由器
module.exports = router
