const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Snippet = require('./models/snippet') // Change this later
require('dotenv').config()
const bcryptjs = require('bcryptjs')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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

app.post('/users', async (req, res) => {
    const { username, password } = req.body
    if (password.length < 3) {
        return res.status(400).json({ error: 'password must be a minimum of 3 letters'})
    }

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)
    
    const user = new User({
        username, passwordHash
    })

    const savedUser = await user.save()
    console.log('posted User')
    res.status(200).json(savedUser)
})

app.get('/users', async (req, res) => {
    const users = await User.find({}).populate('snippets', { title: 1, code: 1})
    res.status(200).json(users)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const isPasswordCorrect = user === null 
    ? false
    : await bcryptjs.compare(password, user.passwordHash)

    if (!(user && isPasswordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userWorthyOfToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userWorthyOfToken, process.env.SECRET)
    console.log('Logged in successfully')
    res.status(200)
    .send({ token, username: user.username})
})


const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on port', port)
})

