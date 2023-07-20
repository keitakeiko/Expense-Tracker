// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const routes = require('./routes') // 會自動尋找底下的 index 總路由
require('./config/mongoose')

const app = express()
const port = 3000


// 建立樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 啟用樣版引擎
app.set('view engine', 'handlebars')


// 所有路由都會先經過 app.use
app.use(session({
  secret: 'rockFish',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes) // 將 request 導入路由器


// 設定 port 
app.listen(port, () => {
  console.log('Express is running on http://localhost:3000')
})