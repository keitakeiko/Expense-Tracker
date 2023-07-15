// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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


// 設定首頁路由
app.get('/', (req, res) => {
  Expense.find() // 取出 Expense model 裡的所有資料
    .lean() // 把 MongoDB 的 Model 物件轉換成乾淨的 JS 資料陣列
    .then( expenses => res.render('index', { expenses })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// 新增資料功能
app.get('/expenses/new', (req, res) => {
  return res.render('new')
})
app.post('/expenses', (req, res) => {
  const { name } = req.body // 從 req.body 拿出表單裡的資料
  return Expense.create({ name }) // 存入資料庫
  .then(() => res.redirect('/'))  // 新增完成後導回首頁
  .catch(error => console.log(error))
})

// 瀏覽特定頁面
app.get('/expenses/:id', (req, res) => {
  const _id = req.params.id
  return Expense.findById(_id)
    .lean()
    .then(expense => res.render('detail', { expense }))
    .catch( error => console.log(error))
})

// 設定 port 
app.listen(port, () => {
  console.log('Express is running on http://localhost:3000')
})