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

app.get("/fruits", async (req, res) => {
  try {
    const con = await client.connect()
    const data = await con.db("6_paskaita_8CAO").collection("fruits").find().toArray()
    await con.close()
    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Filtravimas pagal tipą (ar betkokį kitą parametrą)
app.get("/fruits/origin/:origin", async (req, res) => {
  try {
    const origin = req.params.origin
    const con = await client.connect()
    const data = await con.db("6_paskaita_8CAO").collection("fruits").find({ origin }).toArray()
    await con.close()

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Ištraukimas vieno itemo pagal ID
app.get("/fruits/:id", async (req, res) => {
  try {
    const id = req.params.id
    const con = await client.connect()
    const data = await con.db("6_paskaita_8CAO").collection("fruits").findOne({_id: new ObjectId(id)})// .findOne(new ObjectId(id)); same as ^
    await con.close()

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})



app.post("/fruits", async (req, res) => {
  try {
    const fruit = req.body
    const con = await client.connect()
    const data = await con.db("6_paskaita_8CAO").collection("fruits").insertOne(fruit)
    await con.close()

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})


app.get("/movies", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("6_paskaita_8CAO").collection("movies").find().toArray();
    await con.close();

    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/movies/:sort", async (req, res) => {
  try {
    const sort = req.params.sort
    // 1 didejimo - ascending
    // -1 mazejimo - descending
    const con = await client.connect()
    const data = await con.db("6_paskaita_8CAO").collection("movies").find().sort({ year: sort === "asc" ? 1 : -1 }).toArray()
    // .sort({ title: -1 })
    await con.close()

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})


app.listen(port, () => console.log(`Server is running on port ${port}`))