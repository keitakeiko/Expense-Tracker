const express = require('express')
const router = express.Router()
const User = require('../../models/user')


// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.render('login')
})


// register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors =[]

  if ( !name || !email || !password || !confirmPassword ) {
    errors.push({ message: '所有欄位都是必填唷!' })
  }

  if ( password !== confirmPassword ){
    errors.push({ message: '兩次輸入密碼不同'})
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

  User.findOne({ email })
    .then( user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了'})
          res.render('register', {
            error,
            name,
            email,
            password,
            confirmPassword
          })
      }
      return User.create({ 
        name, 
        email, 
        password, 
        confirmPassword })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})


module.exports = router