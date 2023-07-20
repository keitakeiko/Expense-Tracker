// 引用 express 與 express 路由器
const express = require('express') 
const router = express.Router()


// 引入 home 模組程式碼
const home = require('./modules/home')

// 引入 expenses 模組程式碼
const expenses = require('./modules/expense')

// 引入 users 模組程式碼
const users = require('./modules/users')

// 掛載 middleware
const {  authenticator } = require('../middleware/auth')



// 將網址結構符合 /expenses 字串的 request 導向 expenses 模組
// 加入驗證程序
router.use('/expenses',  authenticator, expenses)

// 將網址結構符合 /users 字串的 request 導向 users 模組
router.use('/users', users)

// 將網址結構符合 / 字串的 request 導向 home 模組
// 加入驗證程序
router.use('/',  authenticator, home)


// 匯出路由器
module.exports = router

