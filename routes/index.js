// 引用 express 與 express 路由器
const express = require('express') 
const router = express.Router()


// 引入 home 模組程式碼
const home = require('./modules/home')

// 引入 expenses 模組程式碼
const expenses = require('./modules/expense')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)

// 將網址結構符合 /expenses 字串的 request 導向 expenses 模組
router.use('/expenses', expenses)

// 匯出路由器
module.exports = router

