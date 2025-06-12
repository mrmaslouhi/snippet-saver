const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Snippet = require('./models/snippet') // Change this later
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url)

app.use(cors())
app.use(express.json())

app.get('/snippets', async (req, res) => {
    const snippets = await Snippet.find({})
    res.json(snippets)
})

app.post('/snippets', async (req, res) => {
    const body = req.body
    const snippet = new Snippet({
        title: body.title,
        code: body.code
    })

    console.log('Saved successfully')
    const savedSnippet = await snippet.save() 
    res.status(200).json(savedSnippet)
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port', port)
})

