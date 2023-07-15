// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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


// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})


// 設定 port 
app.listen(port, () => {
  console.log('Express is running on http://localhost:3000')
})