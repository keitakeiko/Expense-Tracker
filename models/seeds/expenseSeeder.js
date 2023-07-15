const mongoose = require('mongoose')
const Expense = require('../expense') // 載入 expense model

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI,  { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true  
})
// 取得連線狀態
const db = mongoose.connection
// 連現異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () =>{
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    Expense.create({name: `item ${i}`})
  }
  console.log('done')
})