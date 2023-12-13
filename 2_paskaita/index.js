const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('OK')
})

app.get("/fruits", (req, res) => {
  const fruits = ["Carrot", "Banana", "Apple"]
  res.send(fruits)
})


app.get("/todos", (req, res) => {
  const todos = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false,
    },
  ]

  res.send(todos)
})


app.get("/cars", (req, res) => {
  const cars = ["BMW", "VW", "Porsche"]
  res.send(cars)
})

app.listen(3000, () => console.log('This server is running on port 3000'))