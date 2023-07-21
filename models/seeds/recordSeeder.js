const Expense = require('../expense') // 載入 expense model
const Category = require('../category') // 載入 category model
const User = require('../user') // 載入 category model
const db = require('../../config/mongoose')
const expenseList = require('./expense.json').results
const seedUser = require('../../SEED_USER.json')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線成功
db.once('open', async () =>{
  await User.create( seedUser )
  const categoryList = await Category.find().lean() // DB　find
  const userList = await User.find().lean() // DB　find
  expenseList.forEach( expense => { 
    expense.categoryId = categoryList.find(category => category.name === expense.category)._id // JS find
    expense.userId = userList.find(seedUser => seedUser.name === 'user1')._id
  })
  await Expense.create(expenseList)
  console.log('done')
  process.exit()
})
