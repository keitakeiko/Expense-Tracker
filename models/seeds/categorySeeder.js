const Category = require('../category') // 載入 category model

const db = require('../../config/mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const category =
 [{
    'name': 'household',
    'label': '家居物業',
    'icon': 'fas fa-home fa-lg'
  },
  {
    'name': 'transport',
    'label': '交通出行',
    'icon': 'fas fa-shuttle-van fa-lg'
  },
  {
    'name': 'entertainment',
    'label': '休閒娛樂',
    'icon': 'fas fa-grin-beam fa-lg'
  },
  {
    'name': 'food',
    'label': '餐飲食品',
    'icon': 'fas fa-utensils fa-lg'
  },
  {
    'name': 'others',
    'label': '其他',
    'icon': 'fas fa-pen fa-lg'
  }]

// 連線成功
db.once('open', () =>{
  Category.create( category ) // 可放 array. object
    .then(() => {
      console.log('category seeder done!')
      process.exit()
    })
})