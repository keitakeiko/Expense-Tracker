// 引用 express 與 express 路由器
const express = require('express') 
const router = express.Router()
const Expense = require('../../models/expense') // 載入 Expense model

// create
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const expenseCreate = req.body // 從 req.body 拿出表單裡的資料
  return Expense.create( expenseCreate ) // 存入資料庫
  .then(() => res.redirect('/'))  // 新增完成後導回首頁
  .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .lean()
    .then(expense => res.render('detail', { expense }))
    .catch( error => console.log(error))
})

// edit function
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .lean()
    .then(expense => res.render('edit', { expense}))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const { name }= req.body
  return Expense.findById(_id)
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
  return Expense.findById(_id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



// 匯出路由器
module.exports = router

