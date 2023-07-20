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

  let data = [{
    type: 'pie',
    values: values,
    labels: labels,
    textinfo: 'label',
    textposition: 'outside',
    hole: .4,
    automargin: true
  }]

  const layout ={
    height: 400,
    width: 400,
    margin: {'t': 0, 'b': 0, 'l': 0, 'r': 0},
    showlegeng: false
  }

  Plotly.newPlot('mydiv', data, layout)