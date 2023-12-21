const express = require("express")
const cors = require("cors")
const { MongoClient } = require('mongodb')
require("dotenv").config()

const port = process.env.PORT || 8080
const URI = process.env.DB_CONNECTION_STRING
const client = new MongoClient(URI)

const app = express()
app.use(cors())
app.use(express.json())

// app.get("/", async (req, res) => {
//   const con = await client.connect()
//   const data = await con.db("dbname").collection("collectionName").find().toArray()
//   await con.close()
//   return res.send(data)
// })

app.get("/", async (req, res) => {
  try {
    const con = await client.connect()
    const data = await con.db("StudentsDB").collection("Students").find().toArray()
    await con.close()
    return res.send(data)
  } catch(err) {
    res.status(500).send({err})
  }
})

// app.post("/", async (req, res) => {
//   try {
//     const con = await client.connect()
//     const data = await con.db("StudentsDB").collection("Students").insertOne({name: "Petras", surname: "Burokas", age: "25", university: "Vilniaus kolegija"})
//     await con.close()
//     res.send(data)
//   } catch (err) {
//     res.status(500).send({err})
//   }
// })

app.post("/", async (req, res) => {
  try {
    const student = req.body
    const con = await client.connect()
    const data = await con.db("StudentsDB").collection("Students").insertOne(student)
    await con.close()
    res.send(data)
  } catch (err) {
    res.status(500).send({err})
  }
})

app.listen(port, () => console.log(`Server is running on port ${port}`))