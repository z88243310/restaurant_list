// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 引用 errorHandler model
const errorHandler = require('../../models/errorHandler')

// Page : create page
router.get('/create', (req, res) => {
  res.render('create')
})

// Do : Create new restaurant
router.post('/create', (req, res) => {
  req.body.userId = req.user._id
  return Restaurant.create(req.body) // 存入資料庫
    .then((restaurant) => res.redirect(`/restaurants/${restaurant._id}/detail`))
    .catch((error) => errorHandler(error, res))
})

// Page : edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      if (!restaurant) throw ''
      res.render('edit', { restaurant })
    })
    .catch((error) => errorHandler(error, res))
})

// Do : edit restaurant information
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      if (!restaurant) throw ''
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch((error) => errorHandler(error, res))
})

// Page : restaurant detail or simple information
router.get('/:id/detail', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const mode = req.query.simple === 'true' ? 'show' : 'detail'
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      if (!restaurant) throw ''
      res.render(mode, { restaurant })
    })
    .catch((error) => errorHandler(error, res))
})

// Do : delete restaurant data
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      if (!restaurant) throw ''
      restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch((error) => errorHandler(error, res))
})

// 匯出路由模組
module.exports = router
