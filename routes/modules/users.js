// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查是否已註冊
  User.findOne({ email }).then((user) => {
    // 已經註冊，返回註冊頁
    if (user) {
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    }
    // 尚未註冊，寫入資料庫
    return User.create({
      name,
      email,
      password,
    })
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  })
})

module.exports = router
