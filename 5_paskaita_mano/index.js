const express = require("express")
const cors = require("cors")
const {MongoClient} = require('mongodb')

const URI = "mongodb+srv://TaskStudents:TaskStudents@taskstudent.rtc3k9h.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(URI)

const app = express()
app.use(cors())
app.use(express.json())

const port = 3000

// app.get("/", async (req, res) => {
//   const con = await client.connect()
//   const data = await con.db("dbname").collection("collectionName").find().toArray()
//   await con.close()
//   return res.send(data)
// })

app.get("/", async (req, res) => {
  try {
    const con = await client.connect()
    const data = await con.db("StudentsDB").collection("Books").find().toArray()
    await con.close()
  } catch(err) {
    res.status(500).send({err})
  }
})

app.post("/", async (req, res) => {
  try {
    const con = await client.connect()
    const dbRes = await con.db("StudentDB").collection("Students").insertOne({name: "Petras", surname: "Burokas", age: "25", university: "Vilniaus kolegija"})
    await con.close()
    return res.send(dbRes)
  } catch (err) {
    res.status(500).send({err})
  }
})

app.listen(port, () => console.log(`Server is running on port ${port}`))