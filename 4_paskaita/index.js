require("dotenv").config()
const port = process.env.PORT || 8080
const express = require('express')
const cors = require('cors')
const data = require('./data')


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({message: 'OK'})
})

app.get('/bmw', (req, res) => {
  res.send(["13", "i8", "1 series", "3 series", "5 series"])
})

app.get("/audi", (req, res) => {
  res.send(["a1", "a2"])
})

app.get("/cars/:model", (req, res) => {
  console.log(req.params.model)
  res.send({model: req.params.model})
})

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"]
  }


  // Reikia pridėti dar vieną / , kad veiktų, nes prieš tai jau naudota dinaminė nuoroda, tai kad atpažintų reikia "pakelti" aukščiau t. y. pridėti dar vieną /
  app.get("/cars/brand/:brand", (req, res) => {
    const brand = req.params.brand
    res.send(cars[brand])
  })

  app.get("/owners", (req, res) => {
    res.send(data)
  })

  app.get("/owners/email", (req, res) => {
    const allEmails = data.map(owner => owner.email)
    res.send(allEmails)
  })

  app.get("/owners/females", (req, res) => {
    const allFemales = data.filter((owner) => owner.gender === 'Female')
    const females = allFemales.map((female) => `${female.first_name} ${female.last_name}`)
    res.send(females)
  })

  app.get("/owners/car/:car", (req, res) => {
    const car = req.params.car
    const filteredCars = data.filter((owner) => owner.car === car)
    res.send(filteredCars)
  })

  app.get("/owners/:id", (req, res) => {
    const id = Number(req.params.id)
    const foundOwner = data.find((owner) => owner.id === id)
    res.send(foundOwner)
  })


app.listen(port, () => console.log(`Servers is running on port ${port}`))