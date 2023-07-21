const Expense = require('../expense') // 載入 expense model
const Category = require('../category') // 載入 category model
const db = require('../../config/mongoose')
const expenseList = require('./expense.json').results
console.log(expenseList)

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線成功
db.once('open', async () =>{
    const categoryList = await Category.find().lean() // DB　find
    // console.log(categoryList)
    expenseList.forEach( expense => { 
      expense.categoryId = categoryList.find(category => category.name === expense.category)._id // JS find
    })
    console.log(expenseList)
    await Expense.create(expenseList)
  console.log('done')
  process.exit()
})
