const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = app => {
  // 初始化 app 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password ,done) => {
    User.findOne({ email })
      .then( user => {
        if (!user) {        
          return done(null, false, req.flash('warning_msg', 'This email is not registered!'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .lean()
    .then( user => done(null, user))
    .catch( err => done(err, null))
  })
}