// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// Page : create page
router.get('/create', (req, res) => {
  res.render('create')
})

// Do : Create new restaurant
router.post('/create', (req, res) => {
  return Restaurant.create(req.body) // 存入資料庫
    .then((restaurant) => res.redirect(`/restaurants/${restaurant._id}/detail`)) // 回到首頁
    .catch((error) => console.log(error))
})

// Page : restaurant simple information
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// Page : edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// Do : edit restaurant information
router.put('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch((error) => console.log(error))
})

// Page : restaurant detail information
router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

// Do : delete restaurant data
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router
