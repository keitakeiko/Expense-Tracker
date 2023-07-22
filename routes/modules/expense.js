// 引用 express 與 express 路由器
const express = require('express') 
const router = express.Router()
const dayjs = require('dayjs')

const Expense = require('../../models/expense') // 載入 Expense model
const Category = require('../../models/category') // 載入 Category model

// create
router.get('/new', async (req, res) => {
  const category =  await Category.find().lean()
  return res.render('new', { category })
})
router.post('/', (req, res) => {
  const { name, date, categoryId, merchant, amount } = req.body
  const userId = req.user._id
  // console.log(req.body)
  // const categoryId = req.category._id
   // 從 req.body 拿出表單裡的資料
  return Expense.create({ name, date, merchant, amount, categoryId, userId }) // 存入資料庫
    .then(() => res.redirect('/'))  // 新增完成後導回首頁
    .catch(error => console.log(error))
})


// edit function
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  
  return Promise.all([
    Category.find().lean().sort(_id),
    Expense.findOne({ _id, userId }).lean()
  ])
  
    .then(([categoryList, expense]) => {
      expense.date = dayjs(expense.date).format('YYYY-MM-DD')
      res.render('edit', { expense, categoryList })
    })
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, merchant, amount, categoryId } = req.body
  return Expense.findOne({ _id, userId })
    .then( expense => {
      console.log(expense)
      expense.name = name
      expense.date = date
      expense.merchant = merchant
      expense.amount = amount
      expense.categoryId = categoryId
      console.log(expense)
      return expense.save()
    })
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



// 匯出路由器
module.exports = router

