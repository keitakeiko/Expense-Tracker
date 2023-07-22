// 專門管理首頁
// 引用 express 與 express 路由器
const express = require('express')
const router = express.Router()

const Expense = require('../../models/expense') // 引入 expense model
const Category = require('../../models/category') // 引入 category model



// 設定首頁路由
router.get('/', async(req, res) => {
  const userId = req.user._id
  const { categoryId } = req.query
  const category = await Category.find().lean()
  await Expense.find({ userId }) // 取出 Expense model 裡的所有資料
    .lean() // 把 MongoDB 的 Model 物件轉換成乾淨的 JS 資料陣列
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序
    .then( expenses => {
      res.render('index', { expenses, category, categoryId })}) // 將資料傳給 index 樣板
    
    
    .catch(error => console.log(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router