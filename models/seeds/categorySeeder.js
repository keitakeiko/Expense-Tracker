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
    'icon': '<i class="fas fa-home fa-lg"></i>'
  },
  {
    'name': 'transport',
    'label': '交通出行',
    'icon': '<i class="fas fa-shuttle-van fa-lg"></i>'
  },
  {
    'name': 'entertainment',
    'label': '休閒娛樂',
    'icon': '<i class="fas fa-grin-beam fa-lg"></i>'
  },
  {
    'name': 'food',
    'label': '餐飲食品',
    'icon': '<i class="fas fa-utensils fa-lg"></i>'
  },
  {
    'name': 'others',
    'label': '其他',
    'icon': '<i class="fas fa-pen fa-lg"></i>'
  }]

// 連線成功
db.once('open', () =>{
  Category.create(category) // 可放 array. object
    .then(() => {
      console.log('category seeder done!')
    })
})