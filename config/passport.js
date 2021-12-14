const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // 使用者不存在
          if (!user) {
            req.flash('email', email)
            return done(null, false, { message: 'That email is not registered!' })
          }
          // 密碼比對
          return bcrypt.compare(user.password, password).then((isMatch) => {
            // 密碼錯誤
            if (!isMatch) {
              req.flash('email', email)
              return done(null, false, { message: 'Email or Password incorrect.' })
            }
            // 登入成功
            return done(null, user)
          })
        })
        .catch((error) => done(error, false))
    })
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
