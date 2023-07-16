// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const Expense = require('./models/expense') // 載入 Expense model

const app = express()
const port = 3000


// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
// 取得連線狀態
const db = mongoose.connection
// 連現異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () =>{
  console.log('mongodb connected!')
})


// 建立樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 啟用樣版引擎
app.set('view engine', 'handlebars')

// 所有路由都會先經過 app.use
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// 設定首頁路由
app.get('/', (req, res) => {
  Expense.find() // 取出 Expense model 裡的所有資料
    .lean() // 把 MongoDB 的 Model 物件轉換成乾淨的 JS 資料陣列
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序
    .then( expenses => res.render('index', { expenses })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// create
app.get('/expenses/new', (req, res) => {
  return res.render('new')
})
app.post('/expenses', (req, res) => {
  const expenseCreate = req.body // 從 req.body 拿出表單裡的資料
  return Expense.create( expenseCreate ) // 存入資料庫
  .then(() => res.redirect('/'))  // 新增完成後導回首頁
  .catch(error => console.log(error))
})

// detail
app.get('/expenses/:id', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .lean()
    .then(expense => res.render('detail', { expense }))
    .catch( error => console.log(error))
})

// edit function
app.get('/expenses/:id/edit', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .lean()
    .then(expense => res.render('edit', { expense}))
    .catch(error => console.log(error))
})
app.put('/expenses/:id', (req, res) => {
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
app.delete('/expenses/:id', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定 port 
app.listen(port, () => {
  console.log('Express is running on http://localhost:3000')
})