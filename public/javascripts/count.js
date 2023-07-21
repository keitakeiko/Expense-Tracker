const expense = require("../../models/expense")

let values = []
let labels = []

Expense.aggregation([{ $group: { _id: "$category", total: { $sum: "amount"}}}])
  .then( expenses => {
    expenses.forEach( expense => {
      values.push(expense.total)
      labels.push(expense._id)
    })
  })

  