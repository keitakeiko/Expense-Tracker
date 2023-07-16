// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')


const routes = require('./routes') // 會自動尋找底下的 index 總路由

const app = express()
const port = 3000
require('./config/mongoose')

// 建立樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 啟用樣版引擎
app.set('view engine', 'handlebars')


// 所有路由都會先經過 app.use
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes) // 將 request 導入路由器


// 設定 port 
app.listen(port, () => {
  console.log('Express is running on http://localhost:3000')
})