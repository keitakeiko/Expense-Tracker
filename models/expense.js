const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  merchant: {
    type: String,
  },
  amount: {
    type: Number,
    
  },
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Expense', expenseSchema)