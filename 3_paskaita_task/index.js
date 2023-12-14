const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const fruits = [{
  title: "Banana",
  color: "Yellow"
}]

app.get('/', (req, res) => {
  res.send({message: 'Created'})
})

app.get('/fruits', (req, res) => {
  res.send(fruits)
})

app.post('/fruits', (req, res) => {
  const fruit = req.body
  console.log(req.body)
  fruits.push(fruit)
  res.send({message: 'Created'})
})


app.listen(3000, () => console.log('Server is running on port 3000'))