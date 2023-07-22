// 專門管理首頁
// 引用 express 與 express 路由器
const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const localeData = require('dayjs/plugin/localeData')

const Expense = require('../../models/expense') // 引入 expense model
const Category = require('../../models/category') // 引入 category model

dayjs.extend(localeData)

// 設定首頁路由
router.get('/', async(req, res) => {
  let total_expense = 0
  const expense = []
  const userId = req.user._id
  const { categoryId, viewByMonth } = req.query
  const filterBy = { userId }
  const month = dayjs.months() // 叫出 1 - 12 月字串的陣列
  const category = await Category.find().lean()

  if (categoryId) {
    filterBy.categoryId = categoryId
  }
  if (viewByMonth) {
    const selectMonth = dayjs().month(month.indexOf(viewByMonth))
    filterBy.date = { // 設定搜尋整個月份，toDate()為 JS語法，可轉成系統可辨識格式
      $gte: dayjs(selectMonth).startOf('month').toDate(),
      $lte: dayjs(selectMonth).endOf('month').toDate()
    }
  }

  const records = await Expense.find(filterBy).lean().sort({ date: 'asc'})

  records.forEach(record => {
    expense.push(record.amount)
    let categories = category.find(category => String(record.categoryId) === String(category._id))
    record.category_label = categories.label
    record.category_icon = categories.icon
    record.match_id = categories._id
    record.date = dayjs(record.date).format('YYYY-MM-DD ddd')
  })

  if (expense.length !== 0) {
    total_expense = expense.reduce((x, y) => x + y)
  }
  res.render('index', { records, total_expense, category, month, categoryId, viewByMonth})
})

// 匯出路由模組
module.exports = router