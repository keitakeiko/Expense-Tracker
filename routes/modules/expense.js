// 引用 express 與 express 路由器
const express = require('express') 
const router = express.Router()


const Expense = require('../../models/expense') // 載入 Expense model
const Category = require('../../models/category') // 載入 Category model

// create
router.get('/new', async (req, res) => {
  const category =  await Category.find().lean()
  console.log(category)
  return res.render('new', { category })
})
router.post('/', (req, res) => {
  const { name, date, categoryId, merchant, amount } = req.body
  // Category.find({name: name})
  const userId = req.user._id
  console.log(req.body)
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
  const categoryId = req.category
  return Expense.findOne({ _id, userId, categoryId })
    .lean()
    .then(expense => res.render('edit', { expense }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
   const _id = req.params.id
  const userId = req.user._id
  const categoryId = req.category
  const { name }= req.body
  return Expense.findOne({ _id, userId, categoryId })
    .then( expense => {
      expense.name = name
      return  expense.save()
    })
      .then(() => res.redirect(`/expenses/${_id}`))
      .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const categoryId = req.category
  return Expense.findOne({ _id, userId, categoryId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



// 匯出路由器
module.exports = router

