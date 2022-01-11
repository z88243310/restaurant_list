// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error'), email: req.flash('email') }) // 設定 error 訊息
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查輸入正確與否
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '姓名以外的欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查是否已註冊
  User.findOne({ email }).then(user => {
    // 已經註冊，返回註冊頁
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 尚未註冊，加密後，寫入資料庫
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => {
        res.redirect('/')
      })
      .catch(error => console.log(error))
  })
})

module.exports = router
